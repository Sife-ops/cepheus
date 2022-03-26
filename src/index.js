import fetch from "cross-fetch";

const main = async () => {
  async function fetchGraphQL(text, variables) {
    const response = await fetch(
      "https://bookmarks.wyattgoettsch.xyz/api/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: text,
          variables,
        }),
      }
    );

    return await response.json();
  }

  const res = await fetchGraphQL(
` {
  __schema {
    mutationType {
      fields {
        name
      }
    }
  }
} `
    // `mutation Login($username: String!, $password: String!, $remember: Boolean!) {
    //   login(username: $username, password: $password, remember: $remember) {
    //     accessToken
    //   }
    // }`,
    // {
    //   username: "wgoettsch",
    //   password: "9Jc#7j^^fb83F!#%",
    //   remember: false,
    // }
  );

  console.log(JSON.stringify(res));

  console.log(
    JSON.stringify({
      query: ` {
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
} `,
    })
  );
};

main();
