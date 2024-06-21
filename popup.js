document.addEventListener('DOMContentLoaded', function () {
    const geminiDiv = document.getElementById('gemini');
    const responseDiv = document.getElementById('response');
    const editGeminiDiv = document.getElementById('editGemini');
    const geminiInput = document.getElementById('geminiKey');
    const systemInstructionInput = document.getElementById('systemInstruction');
    const saveKeyButton = document.getElementById('saveKey');
    const editKeyButton = document.getElementById('editKey');
    const loadingDiv = document.getElementById('loading');

    function executeScriptAndGetResult(scriptFunction) {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        function: scriptFunction,
                    },
                    (results) => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(results[0].result);
                        }
                    }
                );
            });
        });
    }

    function getText() {
        return executeScriptAndGetResult(() => {
            const selectedText = window.getSelection().toString();
            return selectedText ? selectedText : document.body.innerText;
        });
    }

    function showLoading() {
        loadingDiv.style.display = 'block';
    }

    function hideLoading() {
        loadingDiv.style.display = 'none';
    }

    chrome.storage.local.get(['geminiKey', 'systemInstruction'], function (result) {
        if (result.geminiKey && result.systemInstruction) {
            showLoading();
            getText().then((text) => {
                chrome.runtime.sendMessage({ action: "callAPI", text: text }, function (response) {
                    responseDiv.innerText = response.response;
                    hideLoading();
                });
            });
            editGeminiDiv.style.display = 'block';
        } else {
            geminiDiv.style.display = 'block';
        }
    });

    saveKeyButton.addEventListener('click', function () {
        const geminiKey = geminiInput.value;
        const systemInstruction = systemInstructionInput.value;
        chrome.storage.local.set({ geminiKey: geminiKey, systemInstruction: systemInstruction }, function () {
            geminiDiv.style.display = 'none';
            editGeminiDiv.style.display = 'block';
            showLoading();
            getText().then((text) => {
                chrome.runtime.sendMessage({ action: "callAPI", text: text }, function (response) {
                    responseDiv.innerText = response.response;
                    hideLoading();
                });
            });
        });
    });

    editKeyButton.addEventListener('click', function () {
        chrome.storage.local.get(['geminiKey', 'systemInstruction'], function (result) {
            geminiInput.value = result.geminiKey || '';
            systemInstructionInput.value = result.systemInstruction || '';
            geminiDiv.style.display = 'block';
            editGeminiDiv.style.display = 'none';
        });
    });
});
