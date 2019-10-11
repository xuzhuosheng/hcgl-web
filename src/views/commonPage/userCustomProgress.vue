<template>
    <div class="userCustomProgressPage">
        <div class="userCustomProgressPage-tabs">
        <el-tabs tab-position="top" style="height: 200px;">
            <el-tab-pane label="线形进度条">
                <div class="userCustomProgressPage-tabs__lineProgress">
                    <div>
                        <span>1.线形进度条 — 百分比外显：</span>
                        <el-progress :percentage="0"></el-progress>
                        <el-progress :percentage="70"></el-progress>
                        <el-progress :percentage="80" color="#8e71c7"></el-progress>
                        <el-progress :percentage="100" status="success"></el-progress>
                        <el-progress :percentage="50" status="exception"></el-progress>
                    </div>
                    <div>&ensp;</div>
                    <div>
                        <span>2.线形进度条 — 百分比内显：</span>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="环形进度条">
                <div class="userCustomProgressPage-tabs__circleProgress">
                    <div>
                        <div>1.环形进度条：</div>
                        <el-progress type="circle" :percentage="0"></el-progress>
                        <el-progress type="circle" :percentage="25"></el-progress>
                        <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
                        <el-progress type="circle" :percentage="100" status="success"></el-progress>
                        <el-progress type="circle" :percentage="50" status="exception"></el-progress>
                        <el-progress type="circle" :percentage="100" status="text">Done</el-progress>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        var that = this;
        $(".userCustomProgressPage").css("min-height",$("#app").height()-32);
        $(".userCustomProgressPage-tabs").css("min-height",$("#app").height()-72);
        $(".userCustomProgressPage-tabs .el-tabs__content").css("max-height",$("#app").height()-106).css("overflow","auto")
        
    },
    methods: {
        

    }
}
</script>
