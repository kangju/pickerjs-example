import Picker from 'pickerjs';
import 'pickerjs/dist/picker.css';

const pickerContainerEl = document.querySelector('#picker-container');
const timepickerEl = document.querySelector('#timepicker');

/**
 * ピッカーコンテナのスタイルを初期化する
 */
const initPickerContainerStyle = () => {
    // ピッカーコンテナのスタイルを設定する
    Object.assign(pickerContainerEl.style, {
        display: 'none',
        width: `${timepickerEl.offsetWidth}px`,
        left: `${timepickerEl.offsetLeft}px`,
        top: `${timepickerEl.offsetTop + timepickerEl.offsetHeight}px`,
        position: 'fixed',
        zIndex: 999,
    });
};

/**
 * ピッカーインスタンスを生成する
 * @param {HTMLInputElement} element 
 * @param {HTMLDivElement} container 
 * @returns ピッカーインスタンス
 */
const getPickerInstance = (element, container) => {
    return new Picker(element, {
        container: container,
        format: 'HH:mm',
        inline: true,
        increment: element.getAttribute('step') || 1,
    });
};

window.addEventListener('load', () => {
    initPickerContainerStyle();
    const picker = getPickerInstance(timepickerEl, pickerContainerEl);

    /**
     * ピッカーコンテナを表示する処理
     */
    const showPickerContainer = () => {
        pickerContainerEl.style.display = 'block';
    };

    /**
     * ピッカーコンテナを非表示にする処理
     * @param {Event} e 
     */
    const hidePickerContainer = (e) => {
        if (!pickerContainerEl.contains(e.target) && !timepickerEl.contains(e.target)) {
            pickerContainerEl.style.display = 'none';
        }
    };

    // timepickerをフォーカスした場合にピッカーコンテナを表示する
    timepickerEl.addEventListener('focus', showPickerContainer);

    // document全体をクリックした場合にピッカーコンテナを非表示にする
    document.addEventListener('click', hidePickerContainer);
});
