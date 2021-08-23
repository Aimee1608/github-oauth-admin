<template>
  <div v-if="!hasLogin">
    <h2>未登录--跳转</h2>
    <div><span>不指定用户</span><a :href="url">{{url}}</a></div>
    <div><span>指定用户</span><a :href="login_url">{{login_url}}</a></div>
  </div>
  <div v-else>
    <h2>用户信息</h2>
    <div>{{userInfo.userId}}</div>
    <div>{{userInfo.username}}</div>
    <el-button @click="logout">退出登录</el-button>
    <h3>github 用户信息</h3>
    <GithubInfo :githubInfo="getInfoList(userInfo.githubInfo)" />

    <h3>用户列表</h3>
    <el-table :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="userId"
                       label="userId"
                       align="center" />
      <el-table-column prop="username"
                       align="center"
                       label="用户名" />
      <el-table-column label="github 用户信息"
                       align="center">
        <template #default="scope">
          <el-tooltip placement="top">
            <template #content>
              <GithubInfo :githubInfo="getInfoList(scope.row.githubInfo)" />
            </template>
            <el-button>详情</el-button>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="最近登录时间"
                       align="center">
        <template #default="scope">
          <span>{{ initDate(scope.row.lastLoginDate) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Moment from 'moment'
import { getUserInfo, getAllUser, logout } from './../api/user'
import GithubInfo from './GithubInfo'
import Cookies from 'js-cookie'
const GITHUB_OAUTH = {
  url: 'https://github.com/login/oauth/authorize',
  clientid: '7dd33c1a56813db7f797',
  redirectUri: 'http://localhost:8999/v1/user/login'
}
export default {
  data() {
    return {
      count: 0,
      url: `${GITHUB_OAUTH.url}?client_id=${GITHUB_OAUTH.clientid}&redirect_uri=${GITHUB_OAUTH.redirectUri}&state=123456`,
      login_url: `${GITHUB_OAUTH.url}?client_id=${GITHUB_OAUTH.clientid}&redirect_uri=${GITHUB_OAUTH.redirectUri}&login=123&state=123456`,
      userInfo: {},
      list: []
    }
  },
  props: ['msg'],
  components: {
    GithubInfo
  },
  methods: {
    initDate(date) {
      return Moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    async getUserInfo() {
      console.log('getUserInfo', getUserInfo)
      const res = await getUserInfo()
      this.userInfo = res.data
      console.log('githubInfo', this.userInfo)

    },
    getInfoList(info = {}) {
      const list = Object.keys(info).map(item => {
        return { key: item, value: info[item] }
      })
      return list;
    },
    async checkLogin() {
      const hasLogin = Cookies.get('aimee-test-token')
      this.hasLogin = hasLogin
      if (hasLogin) {
        await this.getUserInfo()
        await this.getAllUser()
      }
    },
    async getAllUser() {
      const res = await getAllUser()
      this.list = res.data
    },
    async logout() {
      const res = await logout()
      window.location.reload()
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
