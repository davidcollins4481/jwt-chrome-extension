(function() {

    var decodeBtn = document.querySelector('.decode-token');

    decodeBtn.onclick = function() {
        var token = document.querySelector('input[name="decode"]').value;

        var base64Url = token.split('.')[1],
            base64 = base64Url.replace('-', '+').replace('_', '/'),
            claims = JSON.parse(atob(base64)),
            expirationTime = new Date(claims.exp * 1000),
            now = new Date(),
            expired = expirationTime < now;

            var displayed = [
                { 'label': 'Issuer (iss)', 'value': claims.iss },
                { 'label': 'Issued At (iat)', 'value': new Date(claims.iat * 1000) + ' (' + claims.iat + ')' },
                { 'label': 'Expiration (exp)', 'value': expirationTime + ' (' + claims.exp + ')'},
                { 'label': 'JWT ID (jti)', 'value': claims.jti },
                { 'label': 'Not Before (nbf)', 'value': claims.nbf },
                { 'label': 'Subject (sub)', 'value': claims.sub }
            ];

            var fragment = document.createDocumentFragment(),
                results = document.querySelector('.results'),
                ul = document.createElement('ul');

            fragment.appendChild(ul);

            displayed.forEach(function(item) {
                var li = document.createElement('li');
                li.innerHTML = '<strong>' + item.label + '</strong>' + ': ' + item.value;
                fragment.appendChild(li);
            });

            var li = document.createElement('li');
            li.innerHTML = expired ? 'Expired' : 'Not Expired';
            li.className = expired ? 'bad' : 'good';

            fragment.appendChild(li);

            results.appendChild(fragment);
    }

})();
