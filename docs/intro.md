---
sidebar_position: 1
---

import { OutputBlock } from "@site/src/components/cell";

# Get Started

With ChatLab, you can augment Large Language Models _with computational powers_ quickly.

- 🐍 Write functions in Python, use any package
- 📗 Run in Jupyter, Colab, Kaggle, Noteable, and more
- 🤖 Chat with your agents in the notebook

<!-- ChatLab is a Python package that makes it easy to experiment with OpenAI's chat models. It provides a simple interface to give assistants access to any Python functions you can write.

Best yet, it's interactive in the notebook! -->

## Installation

```bash
pip install chatlab
```

### Configuration

Set your OpenAI API key as an environment variable.

```bash
export OPENAI_API_KEY=<your key>
```

You can find your API key on your [OpenAI account page](https://platform.openai.com/account/api-keys). Once you have your key, set it to the `OPENAI_API_KEY` environment variable.

:::info

There are many ways to set the `OPENAI_API_KEY` both securely and insecurely. Learn more methods and avoid common pitfalls via [Setting API Keys](/docs/setting-api-keys).

:::

## Your First Soccer Game ⚽️ {#first-example}

Let's play a game of soccer. We'll write a function to flip a coin to determine who gets the first move. The assistant gets to be the referee.

```python cell count=1
from chatlab import system, Conversation, user
import random

def flip_a_coin():
    '''Returns heads or tails'''
    return random.choice(['heads', 'tails'])

# Setup the conversation by writing an initial screenplay
game_intro = '''
## INT. SOCCER FIELD - DAY

**REF**, an experienced official with a firm command of the ⚽️ game, steps forward holding a shining silver coin. The coin that will determine the first move in the game. The home team captain steps up.
'''

conversation = Conversation(
  system("Form responses in Markdown and use emojis."),
  system(game_intro),
)
conversation.register(flip_a_coin)

conversation.submit("**Kai**: We call tails.")
```

<OutputBlock count="1">
  <details style={{
    background: '#DDE6ED',
    color: '#27374D',
    padding: '.5rem 1rem',
    borderRadius: '5px',
  }}>

  <summary>&nbsp;𝑓&nbsp; Ran `flip_a_coin`
  </summary>

Input:

```json
{}
```

Output:

```json
"tails"
```

  </details>

**REF**: It's tails! The first move goes to the home team. Good luck to both teams! Let's begin the game! ⚽️👍🏼
</OutputBlock>

### Roles of a Conversation

To understand what's going on, let's break down the individual `Message`s from `conversation.messages`:

```python cell count=2
conversation.messages
```

```js output count=2
{ role: "system", content: "Form responses in Markdown and use emojis." },

{ role: "system", content: "## INT. SOCCER FIELD - DAY\n\n**REF**, an experienced official with a firm command of the ⚽️ game, steps forward holding a shining silver coin. The coin that will determine the first move in the game. The home team captain steps up." },

{ role: "user", content: "**Kai**: We call tails." },

{ role: "assistant", content: None, function_call: { name: "flip_a_coin", arguments: "{}" }, },

{ role: "function", content: "tails", name: "flip_a_coin" },

{ role: "assistant", content: "It's tails! The first move goes to the home team. Good luck to both teams! Let's begin the game! ⚽️👍🏼", function_call: None, },
```

The four roles in a conversation are:

- `system` - The system is like a narrator to inform the AI of the context of the conversation. They set the scene and steer the model.
- `user` - The user is you, the human, the person, the player, etc.
- `assistant` - The assistant is the model, the AI, it's who `user`s are talking to.
- `function` - The result of a function call in response to the `assistant` requesting a `function_call`.

### Registering Functions

Any function with typed arguments can be registered quickly in a conversation. Registering the function will allow the `assistant` to call it during the conversation.

```python cell count=3
conversation.register(flip_a_coin)
```

```json output count=3
{
  "name": "flip_a_coin",
  "description": "Returns heads or tails",
  "parameters": {
    "type": "object",
    "properties": {},
    "required": []
  }
}
```

Under the hood, ChatLab inspects your function and generates a JSON Schema for it. This schema is used to validate the arguments the assistant sends to your function.

### Submitting Messages

Every time you run `submit`, ChatLab sends the conversation to the assistant and returns the response. The response is a `Message` with the `role` of `assistant`. If we wanted to create this message ourselves, we can run:

```python cell count=4
from chatlab.messaging import assistant_function_call

assistant_function_call("flip_a_coin", arguments="{}")
```

```json output count=4
{
  "role": "assistant",
  "content": null,
  "function_call": { "name": "flip_a_coin", "arguments": "{}" }
}
```

The `content` is `null` because the assistant has decided to call a function. The `arguments` are empty because `flip_a_coin` doesn't take any arguments.

### Calling Functions

When the assistant calls a function, `chatlab` sends back a `Message` with the role `function`. The `content` is the return value of the function.

```python cell count=5
from chatlab.messaging import function_result

function_result(content="tails", name="flip_a_coin")
```

```json output count=5
{
  "role": "function",
  "content": "tails",
  "name": "flip_a_coin"
}
```
