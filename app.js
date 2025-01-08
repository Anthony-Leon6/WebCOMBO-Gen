function generateCombinations(arr) {
    const result = [];
    const f = (prefix, arr) => {
        for (let i = 0; i < arr.length; i++) {
            result.push([...prefix, arr[i]]);
            f([...prefix, arr[i]], arr.slice(i + 1));
        }
    };
    f([], arr);
    return result;
}

const style = document.createElement('style');
style.innerHTML = `
    #terminal {
        background-color: black;
        color: lime;
        font-family: monospace;
        padding: 10px;
        border: 2px solid lime;
        box-shadow: 0 0 10px lime;
    }
    .control-button {
        margin: 5px;
        padding: 5px 10px;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    function generatePossibilities(num) {
        const result = [];
        for (let i = 1; i <= num; i++) {
            result.push(i);
        }
        return result;
    }

    const terminal = document.getElementById('terminal');
    let lastNumber = 0;

    // Create Again button
    const againBtn = document.createElement('button');
    againBtn.textContent = 'Again';
    againBtn.classList.add('control-button');
    againBtn.style.display = 'none';
    document.body.insertBefore(againBtn, terminal);

    // Again button functionality
    againBtn.addEventListener('click', () => {
        if (lastNumber > 0) {
            const possibilities = generatePossibilities(lastNumber);
            const combinations = generateCombinations(possibilities);
            terminal.textContent = combinations.map(c => c.join(',')).join(' | ');
        }
    });

    document.getElementById('generate').addEventListener('click', () => {
        terminal.innerHTML = ''; // Clear previous content
        const num = parseInt(document.getElementById('numberInput').value, 10);
        lastNumber = num;
        againBtn.style.display = 'inline';
    });

    document.getElementById('commandInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            terminal.innerHTML = ''; // Clear previous content
            const command = event.target.value;
            const num = parseInt(command, 10);
            if (!isNaN(num)) {
                lastNumber = num;
                againBtn.style.display = 'inline';
            }
            event.target.value = '';
        }
    });

    // Start over button functionality
    const startOverBtn = document.createElement('button');
    startOverBtn.textContent = 'Start Over';
    startOverBtn.classList.add('control-button');
    startOverBtn.addEventListener('click', () => {
        location.reload();
    });
    document.body.insertBefore(startOverBtn, terminal);

    document.getElementById('box1').addEventListener('click', () => {
        window.location.href = 'https://example.com';
    });

    document.getElementById('box2').addEventListener('click', () => {
        window.location.href = 'https://telegram.org';
    });

    document.getElementById('box3').addEventListener('click', () => {
        window.location.href = 'https://github.com';
    });
});
