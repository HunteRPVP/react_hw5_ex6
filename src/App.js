import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  userPhoto =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png";

  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: "Vadim",
          followed: false,
          photos: [
            {
              small:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png",
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.setUsers(response.data.items);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  src={u.photos.small != null ? u.photos.small : this.userPhoto}
                  alt="Error"
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              {u.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  setUsers(users) {
    this.setState({ users: users });
  }

  unfollow(id) {
    const users = this.state.users;
    users.map((u) => {
      if (u.id === id) {
        u.followed = false;
      }
      return null;
    });
    this.setState(users);
  }

  follow(id) {
    const users = this.state.users;
    users.map((u) => {
      if (u.id === id) {
        u.followed = true;
      }
      return null;
    });
    this.setState(users);
  }
}

export default App;
