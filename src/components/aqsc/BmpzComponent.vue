<template>
  <el-tooltip :disabled="tooltipDisable" class="item" effect="dark" :content="tooltipContentStr" placement="top">
    <el-select v-model="svalue" :placeholder="spholder" filterable :clearable="clearable" :disabled="disabled" style="width: 100%" :collapse-tags="collapseTags"
               :size="size" :multiple="multiple" @change="selectChange">
      <el-option v-for="item in options" :key="item.index" :label="item[displayField]" :value="item[valueField]" />
      <el-option v-show="disempty" value="_null" label="空" />
    </el-select>
  </el-tooltip>
</template>

<script>
import { getMethod } from "@/util/method";
// const userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
export default {
  name: "BmpzComponent",
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    pholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disempty: {
      type: Boolean,
      default: false
    },
    valueField: {
      type: String,
      default: 'dbid'
    },
    displayField: {
      type: String,
      default: 'bmmc'
    },
    size: {
      type: String,
      default: 'small'
    },
    werks: {
      type: String,
      default: ''
    },
    bukrs: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
      svalue: '',
      spholder: '请选择',
      tooltipContentStr: "",
      tooltipDisable: true
    }
  },
  watch: {
    value(val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
      this.svalue = this.value; // 初始话下拉框的值
      this.$emit('input', this.value);
    },
    werks(val, oldVal) {
      this.queryData()
    },
    bukrs() {
      this.queryData()
    }
  },
  mounted() {
    this.svalue = this.value; // 初始话下拉框的值
    this.spholder = this.pholder; // 初始话下拉框的值
    this.queryData();
  },
  methods: {
    selectChange() {
      this.$emit('input', this.svalue);
      if (typeof this.value === 'string') {
        let iteme = {};
        for (let i = 0; i < this.options.length; i++) {
          const item = this.options[i];
          if (item[this.valueField] === this.svalue) {
            iteme = item;
          }
        }
        this.$emit('change', this.svalue, iteme);
      } else {
        // 数组
        const items = [];
        for (let i = 0; i < this.svalue.length; i++) {
          const item = this.svalue[i];
          for (let j = 0; j < this.options.length; j++) {
            const itemj = this.options[j];
            if (item === itemj[this.valueField]) {
              items.push(itemj)
            }
          }
        }
        const svalue_ = this.svalue.map(x => {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].dbid === x) {
              return this.options[i].bmmc;
            }
          }
        });
        this.tooltipContentStr = svalue_.toString();
        this.tooltipDisable = (!this.multiple) || (this.svalue.length < 2);
        this.$emit('change', this.svalue, items);
      }
    },
    queryData(param) {
      const p = { isReplace: "true", is_del: 0, werks: this.werks, bukrs: this.bukrs };
      Object.assign(p, param);
      getMethod('/jtgs/sjgl/process/sjgl_zsj_bmpz?m=query', p).then(response => {
        this.options = response.dataset.datas;
      })
        .catch(() => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    },
    reLoad(param) {
      this.queryData(param).then(response => {
        this.options = response.dataset.datas;
      })
        .catch(() => {
          this.$message({
            type: "error",
            message: "查询数据失败"
          });
        });
    }
  }
}
</script>

<style scoped>

</style>
