const setUsername = () => {
    const username = $(".username-input").val();

    // Replace form with a display of the username, but only if they've entered something
    if (username) {
        $(".username-set").html(`<h2>User ${username}</h2>`);
    }
};