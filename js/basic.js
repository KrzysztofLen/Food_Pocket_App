(function () {
    const inputContainer = document.getElementsByClassName('pl-mobile-dictionary__input-container');
    const input = document.getElementsByClassName('pl-mobile-dictionary__input');

    const submitButton = $('#pl-mobile-dictionary__submit');
    const dangerMsg = $('.pl-mobile-dictionary__danger-message');

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyAKMHRDyIHpLTLwZH0I1g8FoFoHWfXGY-4",
        authDomain: "english-56ed3.firebaseapp.com",
        databaseURL: "https://english-56ed3.firebaseio.com",
        projectId: "english-56ed3",
        storageBucket: "english-56ed3.appspot.com",
        messagingSenderId: "634027372852"
    };

    firebase.initializeApp(config);


    function hideDangerMessage() {
        dangerMsg.addClass('hide');
    }

    submitButton.click(function (e) {
        displayErrorMessage(e);
    });

    submitButton.keypress(function (e) {
        if(e.keyCode == 13 || e.which == 13) {
            displayErrorMessage(e);
        }
    });

    function displayErrorMessage(event) {
        const inputValue = $('#pl-mobile-dictionary__input').val();
        const regexp = new RegExp("^([a-z]{2,})$");

        if((inputValue === '') || (!regexp.test(inputValue))) {
            dangerMsg.removeClass('hide');
            inputContainer[0].classList.add('has-danger');
            input[0].classList.add('form-control-danger');
            event.preventDefault();
        }
    }

    // added to DB
    var database = firebase.database();

    function writeUserData(userId, name, email) {
        database.ref('/' + userId).set({
            username: name,
            email: email
        });
    }

    writeUserData(2, 'Maciej', 'maciej@gmail.com');

    // Read from DB
    var ref = firebase.database().ref();

    ref.on('child_added', function(data) {
        var user = data.val();
        console.log(user);
        console.log("name: " + user.email);
        console.log("age: " + user.username);

    }, function (error) {
        console.log('Error: ' + error.code);
    });

    hideDangerMessage();
})();

