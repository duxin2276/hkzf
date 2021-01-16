const CITY_KEY = 'LOCAL_CITY';
const { BMap: { LocalCity } } = window

export const getLocalCity = () =>
    new Promise((ok, err) => {
        const city = getLocalCitySync()

        city ? ok(city) : new LocalCity().get(async ({ name }) => {
            // 通过后端地址换取可用城市（有房源）名称。
            const { status , body } = await (await fetch('http://localhost:8080/area/info?name=' + name)).json()

            // 持久化存储。
            localStorage[CITY_KEY] = JSON.stringify(body)

            // 把返回结果 resolve 出去
            status === 200 && ok(body)
        })
    })

export const getLocalCitySync = () => JSON.parse(localStorage.getItem(CITY_KEY))  

export const saveList = city => localStorage.setItem(CITY_KEY, JSON.stringify(city))