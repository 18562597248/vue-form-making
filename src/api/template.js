import request from '@/util/request'

export function get(code) {
  return request({
    url: '/tpridmp/process/dmp_report?method=query',
    method: 'get',
    params: {
      code,
    }
  })
}

export function post(data, tables) {
  return request({
    url: '/tpridmp/process/dmp_report?method=save',
    method: 'get',
    params: {
      // dbid: 1012304476813438976,
      werks: 'W074',
      bukrs: 4010,
      name: 'name',
      code: 'code',
      json: JSON.stringify(data),
      version: 0,
      tempjb: 0,
      flid: '1012434389059379200',
      tables
    }
  })
}
