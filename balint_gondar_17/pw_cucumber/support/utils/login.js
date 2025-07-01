
async function loginWithRole(page, role) {
    const credentials = {
        admin: { username: 'student', password: 'Password123' },
        user: { username: 'user1', password: 'userpass' },
    };

    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.fill('#username', credentials[role].username);
    await page.fill('#password', credentials[role].password);
    await page.click('#submit');
}

module.exports = { loginWithRole };