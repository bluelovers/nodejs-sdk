'use strict';
/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

import HttpClient = require('./httpClient');
import crypto = require('crypto');

/**
 * HttpClientVoice类
 * 百度语音接口调用封装
 * 参考文档：http://speech.baidu.com/docs/asr/57
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientVoiceASR extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        requestInfo.params.token = requestInfo.getAccessToken();
        if (requestInfo.params.token === null) {
            requestInfo.params.token = 'bcekey';
        }
        if (typeof requestInfo.params.cuid === 'undefined') {
            requestInfo.params.cuid = this.genMd5(requestInfo.params.token);
        }
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getPureUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };

        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
    genMd5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    }
}

export default HttpClientVoiceASR
// @ts-ignore
Object.assign(HttpClientVoiceASR, exports);
// @ts-ignore
export = HttpClientVoiceASR;
