import React, { CSSProperties, useRef, useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
const rtmToken = (isAdmin: boolean) =>
  isAdmin
    ? "006eb10ea9a439b4110ab24baf0af1fe687IADOtseb6JY1KjMSSkQ1yrVsZYPpZEdhr4yKQ4H1BNJJrLfv3IMAAAAAEACVn+37SZRcZAEA6ANJlFxk"
    : "006eb10ea9a439b4110ab24baf0af1fe687IABohjNaRPatPv4j/15aqNT0/mLQO4KfbDKs5JzN04SuGncVWtYAAAAAEAD7F56KZ5RcZAEA6ANnlFxk";

const rtcToken = (isAdmin: boolean) =>
  isAdmin
    ? "006eb10ea9a439b4110ab24baf0af1fe687IAA3ejW7QqgXCKphHoWLLXwdm7TGx7x/Aycwc3W+TwehYZ9BnzO379yDIgCtcTGmN5RcZAQAAQA3lFxkAgA3lFxkAwA3lFxkBAA3lFxk"
    : "006eb10ea9a439b4110ab24baf0af1fe687IAAeBMuld7hkLYnNBJaW8f0xUTsSJJE6+jITqBxw6S1VHJ9BnzN3FVrWIgDtPlMaW5RcZAQAAQBblFxkAgBblFxkAwBblFxkBABblFxk";

const App: React.FunctionComponent = () => {
  const [videocall, setVideocall] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <h1 style={styles.heading}>Agora React Web UI Kit</h1>
        <h3 style={styles.heading}>Test with admin id = 1 and member id = 11</h3>
        {videocall ? (
          <>
            <AgoraUIKit
              rtcProps={{
                appId: "eb10ea9a439b4110ab24baf0af1fe687",
                channel: "tiennm",
                token: rtcToken(username === "1"),
                layout: layout.grid,
                enableAudio: true,
                enableVideo: true,
                uid: Number(username),
              }}
              rtmCallbacks={{
                client: {
                  MessageFromPeer: (message, id, props) => {
                    console.log("----MessageFromPeer", message, id, props);
                  },
                },
                channel: {
                  MemberJoined: (id) => {
                    console.log("----MemberJoined", id);
                  },
                },
              }}
              rtmProps={{
                displayUsername: true,
                uid: username,
                token: rtmToken(username === "1"),
              }}
              callbacks={{
                EndCall: () => setVideocall(false),
              }}
            />
          </>
        ) : (
          <div style={styles.nav}>
            <input
              style={styles.input}
              placeholder="nickname"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>
              Start Call
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center" as const, marginBottom: 0 },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  } as CSSProperties,
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  },
  input: { display: "flex", height: 24, alignSelf: "center" } as CSSProperties,
};

export default App;
