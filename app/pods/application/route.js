import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'

export default Route.extend({
  model() {

    // twitch
    const client    = 'iz9i9hen697kpsqs04zaxop9p5jnh2'
    // const twitchURL = 'https://api.twitch.tv/helix/users?login=bluewestlo'
    const twitchURL = 'https://api.twitch.tv/helix/users/follows?to_id=52851366'

    // youtube
    const base = 'https://www.googleapis.com/youtube/v3/channels'
    const part = 'statistics'
    const id   = 'UCOb-cMEKg0A7uQPOxdJzJSA'
    const key  = 'AIzaSyDxY2USVXfNPlRaPHcGnWmCijtOh_SGbco'
    const youtubeURL = `${base}?part=${part}&id=${id}&key=${key}`

    return RSVP.hash({
      twitch: fetch(twitchURL, { headers: { 'Client-ID': `${client}` }})
      .then(response => response.json())
      .then(data => data.total),

      youtube: fetch(youtubeURL)
        .then(response => response.json())
        .then(data => {
          if (data.items.length) return data.items[0].statistics.subscriberCount
        })
    })
  }
})
