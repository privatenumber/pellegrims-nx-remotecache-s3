'use strict';

var nxRemotecacheCustom = require('nx-remotecache-custom');
var libStorage = require('@aws-sdk/lib-storage');
var clientS3 = require('@aws-sdk/client-s3');
var matcher = require('matcher');
var credentialProviderNode = require('@aws-sdk/credential-provider-node');
var clientSts = require('@aws-sdk/client-sts');
var nodeHttpHandler = require('@smithy/node-http-handler');
var hpagent = require('hpagent');

const HTTP_PROXY = "HTTP_PROXY";
const HTTPS_PROXY = "HTTPS_PROXY";
const NO_PROXY = "NO_PROXY";
const getEnv = (key) => process.env[key];
const buildCommonCommandInput = (bucket, prefix, filename) => ({
  /* eslint-disable @typescript-eslint/naming-convention */
  Bucket: bucket,
  Key: `${prefix}${filename}`
  /* eslint-enable @typescript-eslint/naming-convention */
});
const getHttpProxy = () => getEnv(HTTP_PROXY.toLowerCase()) || getEnv(HTTP_PROXY) || void 0;
const getHttpsProxy = () => getEnv(HTTPS_PROXY.toLowerCase()) || getEnv(HTTPS_PROXY) || void 0;
const getNoProxy = () => getEnv(NO_PROXY.toLowerCase()) || getEnv(NO_PROXY) || void 0;
const matchesNoProxy = (subjectUrl, noProxy) => {
  if (!noProxy) return false;
  const subjectUrlTokens = new URL(subjectUrl);
  const rules = noProxy.split(/[\s,]+/);
  for (const rule of rules) {
    const ruleMatch = rule.replace(/^(?<leadingDot>\.)/, "*").match(/^(?<hostname>.+?)(?::(?<port>\d+))?$/);
    if (!ruleMatch || !ruleMatch.groups) {
      throw new Error("Invalid NO_PROXY pattern.");
    }
    if (!ruleMatch.groups.hostname) {
      throw new Error(
        "NO_PROXY entry pattern must include hostname. Use * to match any hostname."
      );
    }
    const hostnameIsMatch = matcher.isMatch(
      subjectUrlTokens.hostname,
      ruleMatch.groups.hostname
    );
    if (hostnameIsMatch && (!ruleMatch.groups || !ruleMatch.groups.port || subjectUrlTokens.port && subjectUrlTokens.port === ruleMatch.groups.port)) {
      return true;
    }
  }
  return false;
};

const ENV_ENDPOINT = "NXCACHE_S3_ENDPOINT";
const ENV_PROFILE = "NXCACHE_S3_PROFILE";
const ENV_FORCE_PATH_STYLE = "NXCACHE_S3_FORCE_PATH_STYLE";
const ENV_REGION = "NXCACHE_S3_REGION";
const ENV_ACCESS_KEY_ID = "NXCACHE_S3_ACCESS_KEY_ID";
const ENV_SECRET_ACCESS_KEY = "NXCACHE_S3_SECRET_ACCESS_KEY";
const DEFAULT_S3_ENDPOINT = "https://s3.amazonaws.com";
function getHttpAgent() {
  return new hpagent.HttpsProxyAgent({ proxy: getHttpProxy() });
}
function getHttpsAgent() {
  return new hpagent.HttpsProxyAgent({ proxy: getHttpsProxy() });
}
const getProxyConfig = (s3Endpoint = DEFAULT_S3_ENDPOINT) => ({
  ...!matchesNoProxy(s3Endpoint, getNoProxy()) && (getHttpProxy() || getHttpsProxy()) && {
    requestHandler: new nodeHttpHandler.NodeHttpHandler({
      ...getHttpProxy() && { httpAgent: getHttpAgent() },
      ...getHttpsProxy() && { httpsAgent: getHttpsAgent() }
    })
  }
});
const buildS3Client = (options) => {
  const provider = getCredentialsProvider(options);
  return new clientS3.S3({
    endpoint: getEnv(ENV_ENDPOINT) ?? options.endpoint,
    region: getEnv(ENV_REGION) ?? options.region,
    credentials: provider,
    forcePathStyle: getEnv(ENV_FORCE_PATH_STYLE) === "true" || options.forcePathStyle,
    ...getProxyConfig(
      getEnv(ENV_ENDPOINT) ?? options.endpoint ?? DEFAULT_S3_ENDPOINT
    )
  });
};
const getCredentialsProvider = (options) => {
  const awsAccessKeyIdOverride = getEnv(ENV_ACCESS_KEY_ID);
  const awsSecretAccessKeyOverride = getEnv(ENV_SECRET_ACCESS_KEY);
  if (awsAccessKeyIdOverride?.length && awsSecretAccessKeyOverride?.length) {
    return {
      accessKeyId: awsAccessKeyIdOverride,
      secretAccessKey: awsSecretAccessKeyOverride
    };
  } else {
    return credentialProviderNode.defaultProvider({
      profile: getEnv(ENV_PROFILE) ?? options.profile,
      roleAssumerWithWebIdentity: clientSts.getDefaultRoleAssumerWithWebIdentity(),
      roleAssumer: clientSts.getDefaultRoleAssumer()
    });
  }
};

const ENV_BUCKET = "NXCACHE_S3_BUCKET";
const ENV_PREFIX = "NXCACHE_S3_PREFIX";
const setupS3TaskRunner = async (options) => {
  nxRemotecacheCustom.initEnv(options);
  const s3Storage = buildS3Client(options);
  const bucket = getEnv(ENV_BUCKET) ?? options.bucket;
  const prefix = getEnv(ENV_PREFIX) ?? options.prefix ?? "";
  return {
    name: "S3",
    fileExists: async (filename) => {
      try {
        const result = await s3Storage.headObject(
          buildCommonCommandInput(bucket, prefix, filename)
        );
        return !!result;
      } catch (error) {
        if (error.name === "403" || error.name === "NotFound") {
          return false;
        } else {
          throw error;
        }
      }
    },
    retrieveFile: async (filename) => {
      const result = await s3Storage.getObject(
        buildCommonCommandInput(bucket, prefix, filename)
      );
      return result.Body;
    },
    storeFile: (filename, stream) => {
      const upload = new libStorage.Upload({
        client: s3Storage,
        params: {
          ...buildCommonCommandInput(bucket, prefix, filename),
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Body: stream
        }
      });
      return upload.done();
    }
  };
};

const runner = nxRemotecacheCustom.createCustomRunner(setupS3TaskRunner);

module.exports = runner;
