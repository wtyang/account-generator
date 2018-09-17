import Mock, {
    Random
} from 'mockjs';
// import Luhn from 'luhn-js'
import Luhn from './../assets/scripts/lib/luhn'
/**
 * 生成随机中文名字
 *
 * @export 
 * @returns 
 */
export function rendomName() {
    return Random.cname();
}

/**
 * 生成随机email
 *
 * @export
 * @returns
 */
export function rendomEmail() {
    return Random.email();
}

/**
 * 随机中文字符串
 *
 * @export
 * @param {number} 最小长度
 * @param {number} 最大长度 
 * @returns
 */
export function rendomCWords(min = 10, max = min) {
    return Random.cword(min, max);
}

/**
 * 生成随机身份证号
 *
 * @export
 * @returns 
 */
export function rendomID() {
    return Random.id()
}

/**
 * 生成随机手机号
 * 130-199号段
 *
 * @export
 * @returns
 */
export function rendomMobile() {
    return Mock.mock({
        'regexp': /1[3-9][0-9][0-9]{8}/
    }).regexp
}

/**
 * 生成随机银行卡
 * 19位 农行
 *
 * @export
 * @param {string} [bankCode='622848']  默认农行
 * @returns 银行卡号
 */
export function rendomBankCard(bankCode = '622848') {
    // 随机12位数
    let middleNumber = Mock.mock({
        'regexp': /[0-9]{12}/
    }).regexp;
    let withoutLastNumber = `${bankCode}${middleNumber}`; // 无最后一位数字
    return Luhn.generate(withoutLastNumber);
}