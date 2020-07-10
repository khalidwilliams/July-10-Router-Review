export const getFox = () => {
    return fetch('https://fe-cors-proxy.herokuapp.com', {
      method: 'GET',
      headers: {
        "Target-URL": "https://randomfox.ca/floof/"
      }
    })
      .then(res => res.json())
  
}
