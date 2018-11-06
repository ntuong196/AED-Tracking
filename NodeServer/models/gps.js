const baseAltitude =  1.7
const floorHeight = 2
const allowOffline = 8000

module.exports={
    checkMoving: function(speed){
        if (speed < 2.2) {
            return false
        } else return true
    },
    checkFloorLevel: function(altitude){
        const height = altitude - baseAltitude
        if (height<= 0){
            return 1
        } else {
            return ~~(height/floorHeight + 1)
        }
    },
    checkRecordTime: function(time){
        now = Date()
        // console.log(Date.parse(now))
        // console.log(Date.parse(time))
        if (Date.parse(now) + 36002000 - Date.parse(time) > allowOffline) {
          return false
        } else return true
    }
}