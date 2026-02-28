document.addEventListener('DOMContentLoaded', () => {
    // Utility functions to handle common logic
    function getVal(id) {
        const val = parseFloat(document.getElementById(id).value);
        return isNaN(val) ? null : val;
    }

    function showResult(value, isCurrency = false) {
        const resultDiv = document.getElementById('result-value');
        if (isCurrency) {
            resultDiv.innerText = '$' + formatNumber(value);
        } else {
            resultDiv.innerText = formatNumber(value) + '%';
        }
        
    }

    function formatNumber(num) {
        // Round to 4 decimal places max
        return (Math.round((num + Number.EPSILON) * 10000) / 10000).toString();
    }

    // Generic error handling
    function showError(formId, show) {
        const errorDivs = document.querySelectorAll(`#${formId} .error-msg`);
        errorDivs.forEach(div => {
            div.style.display = show ? 'block' : 'none';
        });
    }

    // Set up clear inputs
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('reset', () => {
            document.getElementById('result-value').innerText = '0%';
            showError(form.id, false);
        });
    });

    // Copy Result Logic
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const resultText = document.getElementById('result-value').innerText;
            navigator.clipboard.writeText(resultText).then(() => {
                const originalText = btnCopy.innerText;
                btnCopy.innerText = 'Copied!';
                btnCopy.classList.add('copied');
                setTimeout(() => {
                    btnCopy.innerText = originalText;
                    btnCopy.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // 1. Percentage Increase
    const formIncrease = document.getElementById('calc-increase');
    if (formIncrease) {
        formIncrease.addEventListener('submit', (e) => {
            e.preventDefault();
            const oldVal = getVal('old-value');
            const newVal = getVal('new-value');
            if (oldVal === null || newVal === null || oldVal === 0) {
                showError('calc-increase', true);
                return;
            }
            showError('calc-increase', false);
            const result = ((newVal - oldVal) / oldVal) * 100;
            showResult(result);
        });
    }

    // 2. Percentage Decrease
    const formDecrease = document.getElementById('calc-decrease');
    if (formDecrease) {
        formDecrease.addEventListener('submit', (e) => {
            e.preventDefault();
            const oldVal = getVal('old-value');
            const newVal = getVal('new-value');
            if (oldVal === null || newVal === null || oldVal === 0) {
                showError('calc-decrease', true);
                return;
            }
            showError('calc-decrease', false);
            const result = ((oldVal - newVal) / oldVal) * 100;
            showResult(result);
        });
    }

    // 3. Profit Margin
    const formMargin = document.getElementById('calc-margin');
    if (formMargin) {
        formMargin.addEventListener('submit', (e) => {
            e.preventDefault();
            const cost = getVal('cost');
            const revenue = getVal('revenue');
            if (cost === null || revenue === null || revenue === 0) {
                showError('calc-margin', true);
                return;
            }
            showError('calc-margin', false);
            const result = ((revenue - cost) / revenue) * 100;
            showResult(result);
        });
    }

    // 4. Markup
    const formMarkup = document.getElementById('calc-markup');
    if (formMarkup) {
        formMarkup.addEventListener('submit', (e) => {
            e.preventDefault();
            const cost = getVal('cost');
            const price = getVal('price');
            if (cost === null || price === null || cost === 0) {
                showError('calc-markup', true);
                return;
            }
            showError('calc-markup', false);
            const result = ((price - cost) / cost) * 100;
            showResult(result);
        });
    }

    // 5. Discount
    const formDiscount = document.getElementById('calc-discount');
    if (formDiscount) {
        formDiscount.addEventListener('submit', (e) => {
            e.preventDefault();
            const original = getVal('original');
            const sale = getVal('sale');
            if (original === null || sale === null || original === 0) {
                showError('calc-discount', true);
                return;
            }
            showError('calc-discount', false);
            const result = ((original - sale) / original) * 100;
            showResult(result);
        });
    }

    // 6. Compound Growth
    const formCompound = document.getElementById('calc-compound');
    if (formCompound) {
        formCompound.addEventListener('submit', (e) => {
            e.preventDefault();
            const initial = getVal('initial');
            const rate = getVal('rate');
            const periods = getVal('periods');
            if (initial === null || rate === null || periods === null) {
                showError('calc-compound', true);
                return;
            }
            showError('calc-compound', false);
            // Future Value = initial * (1 + rate/100)^periods
            const result = initial * Math.pow((1 + (rate / 100)), periods);
            // Result is a value (like $ or units), so we won't append %
            document.getElementById('result-value').innerText = formatNumber(result);
        });
        
        // Custom reset for compound to clear the raw number properly
        formCompound.addEventListener('reset', () => {
            document.getElementById('result-value').innerText = '0';
        });
    }
});
