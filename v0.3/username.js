function setUsername() {
    const usernameInput = document.getElementsByClassName("username-input")[0];
    const username = usernameInput.value;

    // Replace form with a display of the username, but only if they've entered something
    if (username) {
        document.getElementsByClassName("username-set")[0].innerHTML = `<h2>User ${username}</h2>`;
    }
}