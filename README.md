# LoL Custom Tools

This is the front-end implementation for the [LoL Custom Tools](https://lol.tunatuna.dev).

## Tech Stacks
- [Bun](https://bun.sh/) (JavaScript runtime)
- [Next.js](https://nextjs.org/) (Front-end library)
- [Kuma UI](https://www.kuma-ui.com/) (Front-end styling library)

## Features
### Team creation
- Access to the [team creation tool](https://lol.tunatuna.dev/team).
- You can use `/team` command of the discord bot to automatically import members in your voice chat into the tool.
- TODO: insert iamge here

### Draft Ban/Pick Simulator
- Access to the [draft tool](https://lol.tunatuna.dev/draft)
- You can use `/draft` command of the discord bot to create draft room and send link.
- TODO: insert some images here

## How it works
This app works with a combination of [back-end websocket server](https://github.com/tunatuna1733/lol-draft-websocket) and [discord bot](https://github.com/tunatuna1733/lol-draft-sapphire) (optional).

```mermaid
sequenceDiagram
  actor line_1 as User
  participant line_3 as Discord Bot
  participant line_2 as Front-end
  participant line_4 as Back-end
  line_1 ->> line_3: /team command
  line_3 ->> line_4: Create team room request <br>with voice chat member info
  line_4 ->> line_3: Team room id
  line_3 ->> line_1: Send link to the team room
  line_1 ->> line_2: Access with team room id
  line_2 ->> line_4: Team editing requests
  line_4 ->> line_2: Send back room data
  line_1 ->> line_2: Click "Create Draft Room" button
  opt
    line_1 ->> line_3: /draft command
    line_3 ->> line_4: Create draft room request <br>with decided team members
    line_4 ->> line_3: Draft room id
    line_3 ->> line_1: Send link to the draft room
  end
  line_2 ->> line_4: Create draft room request <br>with decided team members
  line_4 ->> line_2: Draft room id
  line_1 ->> line_2: Access with draft room id
  line_2 ->> line_4: Various draft requests
  line_4 ->> line_2: Send back room data
  opt
    line_4 ->> line_3: Send draft result after it has ended
    line_3 ->> line_1: Send draft result image
  end
```