const { showClasses, showClass, saveClass, saveParentClass } = require('./admin/classes.js')
const { showBirds, showBird, saveBird, changeGenus } = require('./admin/birds.js')
const { showTasks, showTask, saveTask, uploadImage, viewStats } = require('./admin/tasks.js')
const { showLogin, processLogin, logout } = require('./admin/admin.js')
const { showTodaysTask, getBirdNames, guessBird, changeLanguage, getStats } = require('./public/tasks.js')
const { showCalendar, changeCalendar } = require('./admin/calendar.js')

const routes = {
  admin : {
    admin : {
      url : "/admin/",
      action : showCalendar,
      method : 'get'
    },
    adminlogin : {
      url : "/admin/login/",
      action : showLogin,
      method : 'get',
      skipAuth : true
    },
    adminprocesslogin : {
      url : "/admin/processlogin/",
      action : processLogin,
      method : 'post',
      skipAuth : true
    },
    adminlogout : {
      url : "/admin/logout/",
      action : logout,
      method : 'get'
    },
    calendar : {
      url : "/admin/calendar/",
      action : showCalendar,
      method : 'get'
    },
    changecalendar : {
      url : "/admin/changecalendar/",
      action : changeCalendar,
      method : 'post'
    },
    classes : {
      url : "/admin/classes/",
      action : showClasses,
      method : 'get'
    },
    showclass : {
      url : "/admin/class/:classId*?",
      action : showClass,
      method : 'get'
    },
    saveclass : {
      url : "/admin/saveclass/:classId*?",
      action : saveClass,
      method : 'post'
    },
    saveparent : {
      url : "/admin/saveparent/:classId*?",
      action : saveParentClass,
      method : 'post'
    },
    birds : {
      url : "/admin/birds/",
      action : showBirds,
      method : 'get'
    },
    showbird : {
      url : "/admin/bird/:birdId*?",
      action : showBird,
      method : 'get'
    },
    savebird : {
      url : "/admin/savebird/:birdId*?",
      action : saveBird,
      method : 'post'
    },
    changegenus : {
      url : "/admin/changegenus/",
      action : changeGenus,
      method : 'post'
    },
    tasks : {
      url : "/admin/tasks",
      action : showTasks,
      method : 'get'
    },
    showtask : {
      url : "/admin/showtask/:taskId*?",
      action : showTask,
      method : 'get'
    },
    savetask : {
      url : "/admin/savetask/:taskId*?",
      action : saveTask,
      method : 'post'
    },
    uploadImage : {
      url : "/admin/uploadimage/",
      action : uploadImage,
      method : 'post'
    },
    viewstats : {
      url : "/admin/viewstats/",
      action : viewStats,
      method : 'get'
    }
  },
  public : {
    index : {
      url : "/",
      action : showTodaysTask,
      method : 'get'
    },
    getbirdnames : {
      url : "/getbirdnames",
      action : getBirdNames,
      method : 'get'
    }
  },
  ws : {
    guess : {
      command : 'GUESS',
      action : guessBird,
      type : 'ws'
    },
    getStats : {
      command : 'GETSTATS',
      action : getStats,
      type : 'ws'
    },
    changeLanguage : {
      command : 'CHANGELANG',
      action : changeLanguage,
      type : 'ws'
    }
  }
}

module.exports = { routes }
