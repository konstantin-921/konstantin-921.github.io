const FriendsPost = (function () {

  function FriendsPost() {

    const buttonPosts = document.getElementById('postsBtn');
    const blockRight = document.getElementById('block-right');
    const help = new Help();

    if (buttonPosts) {
      buttonPosts.addEventListener('click', function (event) {
        event.preventDefault();

        let data = {
          id: localStorage['user.id']
        }

        var url = new URL('http://localhost:3000/posts/friendsposts');
        url.search = new URLSearchParams(data);

        ApiFetch.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
          redirect: 'follow'
        })
          .then(help.checkStatus)
          .then(help.parseJSON)
          .then(function (response) {

            const listFriends = document.createElement('ul');
            listFriends.id = 'listFriends';
            listFriends.className = 'list-friends';

            for (var i = 0; i < response.length; i++) {
              let id = response[i].user_id;
              let content = response[i].content;
              let title = response[i].title;
              let date = response[i].date;
              let name = response[i].name;
              var newPost = new Post(content, title, date, name);
              listFriends.appendChild(newPost.elem);
            }

            while (blockRight.lastChild) {
              blockRight.removeChild(blockRight.lastChild);
            }

            blockRight.appendChild(listFriends);

          })
          .catch(function (error) {
            console.log(error);
          })
      })
    }
  }

  return FriendsPost;

})()

