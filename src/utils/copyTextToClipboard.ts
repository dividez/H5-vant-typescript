import {showSuccessToast, showFailToast} from 'vant';
import Clipboard from 'clipboard'
export function copyText(text: string, prompt: string | null = '已成功复制到剪切板!') {
    console.log('copyText', text);
    const btn = document.createElement('button');
    btn.id = 'copyBtn';
    btn.setAttribute("data-clipboard-text", text);
    document.body.appendChild(btn);
    var clipboard = new Clipboard("#copyBtn") //绑定数据标签的类名
    btn.click();
    clipboard.on('success', e => {
        console.log('复制成功', e)
        // Toast.success('复制成功');
        prompt && showSuccessToast(prompt);
        // 释放内存
        clipboard.destroy()
    })
    clipboard.on('error', e => {
        showFailToast('该浏览器或手机权限不支持复制功能')
        // 释放内存
        clipboard.destroy()
    })
    document.body.removeChild(btn);
}
