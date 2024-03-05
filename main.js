let requestUrl;

document.addEventListener('DOMContentLoaded', () => {
    let ipAddressPort = prompt('Enter IP address and port number (e.g., 192.168.XX:80):');

    if (ipAddressPort) {
        requestUrl = `http://${ipAddressPort}`;
    } else {
        requestUrl = 'http://127.0.0.1:80';
    }

    document.getElementById('addBtn').addEventListener('click', () => {
        let name = prompt('Enter name:');
        let onCommand = prompt('Enter command for toggle ON:');
        let offCommand = prompt('Enter command for toggle OFF:');

        let col = document.createElement('div');
        col.classList.add('toggle-card');

        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerHTML = '<h4><b>' + name + '</b></h4>';

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.classList.add('toggle');

        let removeBtn = document.createElement('div');
        removeBtn.classList.add('removeBtn');
        removeBtn.innerHTML = '&#10060;';

        cardBody.appendChild(toggle);
        cardBody.appendChild(removeBtn);
        col.appendChild(cardHeader);
        col.appendChild(cardBody);

        document.getElementById('requestBtns').appendChild(col);
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                executeCommand(onCommand);
            } else {
                executeCommand(offCommand);
            }
        });

        removeBtn.addEventListener('click', () => {
            col.remove();
        });

        function executeCommand(command) {
            let fullRequestUrl = `${requestUrl}/${command}`;
            $.ajax({
                url: fullRequestUrl,
                method: 'POST',
            });
        }
    });

    document.getElementById('sendButton').addEventListener('click', () => {
        let commandInput = document.getElementById('commandInput').value;
        if (commandInput) {
            let fullRequestUrl = `${requestUrl}/${commandInput}`;

            fetch(fullRequestUrl, {
                method: 'POST',
            });
        }
    });
});
