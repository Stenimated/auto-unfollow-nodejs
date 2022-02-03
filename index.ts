import noblox from "noblox.js"
import fs from 'fs'


//

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

//

const target = Number(config.target) // where to fetch followers from
const cookie = config.cookie // insert cookies

//

const getFollowers = async (user_id: number) => {
    return await noblox.getFollowings(user_id)
}

const unfollow = async (user_id: number) => {
    return await noblox.unfollow(user_id)
}


const main = async () => {
    while (true) {
        const pages = await getFollowers(target)

        if (pages.data.length === 0) {
            break
        }

        for (let i = 0; i < pages.data.length; i++) {
            const user_id = pages.data[i].id

            if (user_id === target) {
                continue
            }

            try {
                await unfollow(user_id)
                console.log(`unfollowed ${pages.data[i].name}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

    console.log("it's done!")
}


// login
noblox.setCookie(cookie).then(main)