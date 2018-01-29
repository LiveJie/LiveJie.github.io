<template>
    <div class="main" ref="a">
        <h1 class="h1 fontsize30" @click="open">请选择出生日期</h1>
        <div class="content" v-show="status">
            <p v-for="item in day">{{item}}</p>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerVisible" :startDate="startT" :end-Date="endT" type="date" @cancel="cancel"
            @confirm="confirm" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
        </mt-datetime-picker>
    </div>
</template>
<script>
    import Ajax from "../../config/ajax.js"
    export default {
        data() {
            return {
                startT: new Date('1980-01-01'),
                endT: new Date('2020-01-01'),
                pickerVisible: null,
                status:false,
                day:{
                    summary_star:"1",
                    love_star:"2",
                    money_star:"",
                    work_star:"",
                    grxz:"",
                    lucky_num:"",
                    day_notice:"",
                    general_txt:"",
                    love_txt:"",
                    work_txt:"",
                    money_txt:""
                }
            }
        },
        methods: {
            open() {
                this.$refs.picker.open();
            },
            confirm() {
                console.log(this.$refs.picker.currentValue)
                var d = new Date(this.$refs.picker.currentValue);
                let mon = d.getMonth() + 1;
                let day = d.getDate();
                let constellation = null;
                console.log(mon + "==" + day);
                // match  constellation
                switch (mon) {
                    case 1:
                        if (day < 20) {
                            constellation = 'mojie';
                        } else {
                            constellation = 'shuiping';
                        }
                        break;
                    case 2:
                        if (day < 19) {
                            constellation = 'shuiping';
                        } else {
                            constellation = 'shuangyu';
                        }
                        break;
                    case 3:
                        if (day < 21) {
                            constellation = 'shuangyu';
                        } else {
                            constellation = 'baiyang';
                        }
                        break;
                    case 4:
                        if (day < 20) {
                            constellation = 'baiyang';
                        } else {
                            constellation = 'jinniu';
                        }
                        break;
                    case 5:
                        if (day < 21) {
                            constellation = 'jinniu';
                        } else {
                            constellation = 'shuangzi';
                        }
                        break;
                    case 6:
                        if (day < 22) {
                            constellation = 'shuangzi';
                        } else {
                            constellation = 'juxie';
                        }
                        break;
                    case 7:
                        if (day < 23) {
                            constellation = 'juxie';
                        } else {
                            constellation = 'shizi';
                        }
                        break;
                    case 8:
                        if (day < 23) {
                            constellation = 'shizi';
                        } else {
                            constellation = 'chunv';
                        }
                        break;
                    case 9:
                        if (day < 23) {
                            constellation = 'chunv';
                        } else {
                            constellation = 'tiancheng';
                        }
                        break;
                    case 10:
                        if (day < 23) {
                            constellation = 'tiancheng';
                        } else {
                            constellation = 'tianxie';
                        }
                        break;
                    case 11:
                        if (day < 23) {
                            constellation = 'tianxie';
                        } else {
                            constellation = 'sheshou';
                        }
                        break;
                    default:
                        if (day < 23) {
                            constellation = 'sheshou';
                        } else {
                            constellation = 'mojie';
                        }
                }
                // alert(constellation)
                let a = "";
                Ajax.post("http://route.showapi.com/872-1", {
                    showapi_appid: 42425,
                    showapi_sign: '35b5faa8ea714867abfa48b1195c8a07',
                    star: "mojie"
                }).then(resolve => {
                    console.log(resolve)
                    this.day = resolve.data.showapi_res_body.day;
                    console.log(this.day)
                    this.status = true;
                    // day
                    // summary_star 综合指数
                    // love_star 爱情指数
                    // money_star 财富指数
                    // work_star 工作
                    // grxz 贵人指数
                    // lucky_num 幸运数字
                    // day_notice 今日提醒
                    // general_txt 运势简价
                    // love_txt 爱情运势
                    // work_txt 工作运势
                    // money_txt 财富运势

                }, reject => {
                    console.log(reject)
                })

            },
            cancel() {
                this.$refs.picker.close();
            },
        },

        created() {

        }
    }
</script>