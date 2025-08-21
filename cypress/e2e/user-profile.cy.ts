import {LoginPage} from "../pages/LoginPage";
import {UserService} from "../support/services/user-service";
import {User, UserType} from "../support/model/User";
import {UserProfilePage} from "../pages/UserProfilePage";
import {UserProfileService} from "../support/services/user-profile-service";

describe('Manage user profile', () => {

    let loginPage: LoginPage;
    let userProfilePage: UserProfilePage;

    let userService: UserService;
    let userProfileService: UserProfileService;

    let currentUserId: number;

    let userFixture: User;

    before(() => {
        userService = new UserService();
        cy.fixture('users.json').then(userData => {
            userFixture = userData.testUser;
            userService.seedData(userData.testUser);
        });

        loginPage = new LoginPage(UserType.testUser);

        loginPage.loggedInUserId.subscribe(userId => currentUserId = userId);

        loginPage.logout();
    })

    beforeEach(() => {
        loginPage.login();

        userProfilePage = new UserProfilePage();
        userProfileService = new UserProfileService();
    })

    after(() => {
        userService.resetData();
    })

    it('UP001 - user profile data can be updated', () => {
        const updatedUser = {...userFixture};
        updatedUser.firstName = "NewName";

        userProfileService.updateProfile(currentUserId, updatedUser)
            .then((response) => {
                userProfileService.verifyResponseStatus(response, 200);
                userProfileService.verifyResponseMessage(response, 'Successfully updated customer profile');
            })
    });


    it('UP002 - change in user profile data displayed in profile page', () => {
        const updatedUser = {...userFixture};
        updatedUser.lastName = "Changed Name";

        userProfileService.updateProfile(currentUserId, updatedUser)
            .then((response) => {
                userProfileService.verifyResponseStatus(response, 200);
                userProfileService.verifyResponseMessage(response, 'Successfully updated customer profile');
            })

        userProfilePage.goToPage();
        userProfilePage.verifyFieldValue('lastName', 'Changed Name');
    });
})