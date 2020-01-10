import * as util from './index';
import * as utilAxios from './services';
// import axios from 'axios'
const ourHost = 'https://adventure-island-cs23.herokuapp.com'



async function bfs(currentRoom, desRoom) {
  // console.log('inside bfs')
  let rooms = await utilAxios.axiosWithAuth().get(`${ourHost}/rooms/`)
  // console.log(rooms, 'rooms')

  let q = []
  let path = []
  path.push(currentRoom)
  q.push(path)
  let visited = new Set()

  while(q.length > 0) {
    path = q.shift()
    console.log('TRAVEL PATH', path);
    let v;
    if (!Array.isArray(path[path.length -1])) {
      v = path[path.length - 1]
    } else {
      // console.log('we have an array')
      v = path[path.length - 1][1]
      // console.log(v)
    }

    if (!visited.has(v)) {
      if ( v === desRoom) {
        return path
      }
      visited.add(v)

      let roomInfo = rooms.data.filter(room => room.room_id === v)
      // console.log(roomInfo[0], "Room Info")

      for (let direc in roomInfo[0].dir) {
        let copyPath = [...path]
        copyPath.push([direc.slice(0,1), roomInfo[0].dir[direc]])
        q.push(copyPath)
        // console.log("queue",q)
      }  
      
    } // end first if

  } //end while loop

}

export {
    bfs
}