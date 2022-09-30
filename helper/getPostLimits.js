let followersLimit = 0;
let friendsLimit = 0;
let interestsLimit = 0;
let selfLimit = 0;

export const PostLimit = (followingsList, followersList, interestsList) => {

    if (followingsList.length > 0 && followersList.length > 0 && interestsList.length > 0) {
        followersLimit = 6;
        friendsLimit = 6;
        interestsLimit = 6;
        selfLimit = 4;
    } else if (followingsList.length > 0 && followersList.length > 0 && interestsList.length === 0) {
        followersLimit = 9;
        friendsLimit = 9;
        interestsLimit = 0;
        selfLimit = 4;
    } else if (followingsList.length === 0 && followersList.length > 0 && interestsList.length > 0) {
        followersLimit = 0;
        friendsLimit = 9;
        interestsLimit = 9;
        selfLimit = 4;
    } else if (followingsList.length > 0 && followersList.length === 0 && interestsList.length > 0) {
        followersLimit = 9;
        friendsLimit = 0;
        interestsLimit = 9;
        selfLimit = 4;
    } else if (followingsList.length > 0 && followersList.length === 0 && interestsList.length === 0) {
        followersLimit = 18;
        friendsLimit = 0;
        interestsLimit = 0;
        selfLimit = 4;
    } else if (followingsList.length === 0 && followersList.length > 0 && interestsList.length === 0) {
        followersLimit = 0;
        friendsLimit = 18;
        interestsLimit = 0;
        selfLimit = 4;
    } else if (followingsList.length === 0 && followersList.length === 0 && interestsList.length > 0) {
        followersLimit = 0;
        friendsLimit = 0;
        interestsLimit = 18;
        selfLimit = 4;
    } else {
        followersLimit = 6;
        friendsLimit = 6;
        interestsLimit = 6;
        selfLimit = 4;
    }
    return {
        followersLimit,
        friendsLimit,
        interestsLimit,
        selfLimit
    }
}