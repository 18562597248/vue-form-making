import request from '@/util/request'

export function queryDataBook(query) {
  return request({
    url: '/jtgs/tpridmp/process/Common_ComboBox?type=databook',
    method: 'get',
    params: query
  })
}

export function queryDataBookGroupCode(code) {
  return request({
    url: '/jtgs/tpridmp/process/dmp_databook?method=query_group',
    method: 'get',
    params: {
    projectcode: 'AQSC_' + code.toUpperCase()
    }
  })
}
