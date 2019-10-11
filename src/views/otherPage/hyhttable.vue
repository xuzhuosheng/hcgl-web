<template>
  <div>
    <div id="treeDemo0" style="width: 1000px;height: auto;"></div>
  </div>
</template>
<style>
    #treeDemo0,#treeDemo1{
        margin:100px 0 0 50px;
    }
</style>
<script>
import "../../../static/ztree/js/jquery.ztree.all.js";
import "../../../static/ztree/ztablehelper.js";
import "../../../static/ztree/css/zTableStyle.css";
import '../../../static/ztree/js/jquery.pagination.js'

export default {
  data() {
    return {};
  },
  mounted() {
    var data_2 = {
      columns: [
        {
          name: "dq",
          dataIndex: "dq",
          rowSpan: 2,
          minWidth: "",
          align: "left",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "dq",
              rowSpan: 1,
              minWidth: null,
              align: "left",
              level: 2,
              children: [
                {
                  name: "栏次",
                  dataIndex: "dq",
                  rowSpan: 1,
                  minWidth: null,
                  align: "left",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "hy",
          dataIndex: "hy",
          rowSpan: 2,
          minWidth: "",
          align: "left",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "hy",
              rowSpan: 1,
              minWidth: null,
              align: "left",
              level: 2,
              children: [
                {
                  name: "1",
                  dataIndex: "hy",
                  rowSpan: 1,
                  minWidth: null,
                  align: "left",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "b",
          dataIndex: "B",
          rowSpan: 2,
          minWidth: "",
          align: "right",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "B",
              rowSpan: 1,
              minWidth: null,
              align: "right",
              level: 2,
              children: [
                {
                  name: "2",
                  dataIndex: "B",
                  rowSpan: 1,
                  minWidth: null,
                  align: "right",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "c",
          dataIndex: "A",
          rowSpan: 2,
          minWidth: "",
          align: "right",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "A",
              rowSpan: 1,
              minWidth: null,
              align: "right",
              level: 2,
              children: [
                {
                  name: "3",
                  dataIndex: "A",
                  rowSpan: 1,
                  minWidth: null,
                  align: "right",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        }
      ],
      dataSource: [
        {
          B: 30442,
          A: 3,
          dq: "广东",
          hy: "合计",
          children: [
            {
              B: 14240,
              A: 4,
              dq: "",
              hy: "服装"
            },
            {
              B: 16202,
              A: 3,
              dq: "",
              hy: "餐饮"
            }
          ]
        },
        {
          B: 32680,
          A: 3,
          dq: "湖北",
          hy: "合计",
          children: [
            {
              B: 16080,
              A: 3,
              dq: "",
              hy: "服装"
            },
            {
              B: 16600,
              A: 3,
              dq: "",
              hy: "餐饮"
            }
          ]
        }
      ]
    };
    var data_3 = {
      columns: [
        {
          name: "dq",
          dataIndex: "dq",
          rowSpan: 2,
          minWidth: "",
          align: "left",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "dq",
              rowSpan: 1,
              minWidth: null,
              align: "left",
              level: 2,
              children: [
                {
                  name: "栏次",
                  dataIndex: "dq",
                  rowSpan: 1,
                  minWidth: null,
                  align: "left",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "hy",
          dataIndex: "hy",
          rowSpan: 2,
          minWidth: "",
          align: "left",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "hy",
              rowSpan: 1,
              minWidth: null,
              align: "left",
              level: 2,
              children: [
                {
                  name: "1",
                  dataIndex: "hy",
                  rowSpan: 1,
                  minWidth: null,
                  align: "left",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "gw",
          dataIndex: "gw",
          rowSpan: 2,
          minWidth: "",
          align: "left",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "gw",
              rowSpan: 1,
              minWidth: null,
              align: "left",
              level: 2,
              children: [
                {
                  name: "2",
                  dataIndex: "gw",
                  rowSpan: 1,
                  minWidth: null,
                  align: "left",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "b",
          dataIndex: "B",
          rowSpan: 2,
          minWidth: "",
          align: "right",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "B",
              rowSpan: 1,
              minWidth: null,
              align: "right",
              level: 2,
              children: [
                {
                  name: "3",
                  dataIndex: "B",
                  rowSpan: 1,
                  minWidth: null,
                  align: "right",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        },
        {
          name: "c",
          dataIndex: "A",
          rowSpan: 2,
          minWidth: "",
          align: "right",
          level: 1,
          children: [
            {
              name: "待删除",
              dataIndex: "A",
              rowSpan: 1,
              minWidth: null,
              align: "right",
              level: 2,
              children: [
                {
                  name: "4",
                  dataIndex: "A",
                  rowSpan: 1,
                  minWidth: null,
                  align: "right",
                  level: 3,
                  children: null
                }
              ]
            }
          ]
        }
      ],
      dataSource: [
        {
          B: 30442,
          A: 3,
          dq: "广东",
          hy: "合计",
          gw: "",
          children: [
            {
              B: 14240,
              A: 4,
              dq: "",
              hy: "服装",
              gw: "合计",
              children: [
                {
                  B: 8040,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "管理"
                },
                {
                  B: 6200,
                  A: 4,
                  dq: "",
                  hy: "",
                  gw: "销售"
                }
              ]
            },
            {
              B: 16202,
              A: 3,
              dq: "",
              hy: "餐饮",
              gw: "合计",
              children: [
                {
                  B: 8200,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "管理"
                },
                {
                  B: 8002,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "销售"
                }
              ]
            }
          ]
        },
        {
          B: 32680,
          A: 3,
          dq: "湖北",
          hy: "合计",
          gw: "",
          children: [
            {
              B: 16080,
              A: 3,
              dq: "",
              hy: "服装",
              gw: "合计",
              children: [
                {
                  B: 8080,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "管理"
                },
                {
                  B: 8000,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "销售"
                }
              ]
            },
            {
              B: 16600,
              A: 3,
              dq: "",
              hy: "餐饮",
              gw: "合计",
              children: [
                {
                  B: 8200,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "管理"
                },
                {
                  B: 8400,
                  A: 3,
                  dq: "",
                  hy: "",
                  gw: "销售"
                }
              ]
            }
          ]
        }
      ]
    };
    var data_1 = {
      tableName: "世界500强企业税收情况按行业分析",
      creatTime: 2016,
      unit: "万元/户",
      columns: [
        {
          name:
            "行业(门类)行业(门类)行业(门类)行业(门类)行业(门类)行业(门类)行业(门类)行业(门类)",
          dataIndex: "",
          minWidth: 220,
          rowSpan: 2,
          align: "left",
          children: [
            {
              name: "待删除",
              dataIndex: "",
              rowSpan: 1,
              align: "left",
              children: [
                {
                  name: "栏位",
                  dataIndex: "hymc",
                  align: "left",
                  rowSpan: 1,
                  minWidth: 140,
                  isShowOrderBy: true,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "企业数量",
          dataIndex: "",
          rowSpan: 1,
          align: "left",
          minWidth: 140,
          children: [
            {
              name: "户数",
              dataIndex: "",
              rowSpan: 1,
              align: "left",
              children: [
                {
                  name: "1",
                  align: "left",
                  dataIndex: "qyslhs",
                  rowSpan: 1,
                  minWidth: 140,
                  children: []
                }
              ]
            },
            {
              name: "同比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "left",
              children: [
                {
                  name: "2",
                  align: "left",
                  dataIndex: "qysltb",
                  rowSpan: 1,
                  children: []
                }
              ]
            },
            {
              name: "占总户数比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "left",
              children: [
                {
                  name: "3",
                  align: "left",
                  dataIndex: "qyslzzhsb",
                  rowSpan: 1,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "纳税贡献",
          dataIndex: "",
          rowSpan: 1,
          align: "right",
          minWidth: 140,
          children: [
            {
              name: "纳税额",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "4",
                  align: "right",
                  dataIndex: "nsgxnse",
                  rowSpan: 1,
                  children: []
                }
              ]
            },
            {
              name: "同比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "5",
                  align: "right",
                  dataIndex: "nsgxtb",
                  rowSpan: 1,
                  minWidth: 140,
                  isShowOrderBy: true,
                  curOrderBy: 2,
                  children: []
                }
              ]
            },
            {
              name: "占总税收比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "6",
                  align: "right",
                  dataIndex: "nsgxzzssb",
                  rowSpan: 1,
                  minWidth: 140,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "销售收入贡献",
          dataIndex: "",
          rowSpan: 1,
          align: "right",
          minWidth: 130,
          children: [
            {
              name: "销售收入",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "7",
                  align: "right",
                  dataIndex: "dzxssr",
                  rowSpan: 1,
                  minWidth: 140,
                  children: []
                }
              ]
            },
            {
              name: "同比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "8",
                  align: "right",
                  dataIndex: "dztb",
                  rowSpan: 1,
                  minWidth: 140,
                  children: []
                }
              ]
            },
            {
              name: "占GDP比(%)",
              dataIndex: "",
              rowSpan: 1,
              align: "right",
              children: [
                {
                  name: "9",
                  align: "right",
                  dataIndex: "dzzgdpb",
                  rowSpan: 1,
                  minWidth: 140,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      dataSource: [
        {
          hymc: "广东",
          hyhttable_hymc_kpi: "",
          qyslhs: 90,
          hyhttable_qyslhs_kpi: "font#1,up#1,down#1,warn#1",
          qysltb: 12,
          hyhttable_qysltb_kpi: "up,down,warn",
          qyslzzhsb: 13000,
          hyhttable_qyslzzhsb_kpi: "font#1,warn",
          nsgxnse: 14,
          hyhttable_nsgxnse_kpi: "font#1,down,up",
          nsgxtb: 111,
          hyhttable_nsgxtb_kpi: "warn,up",
          nsgxzzssb: 234,
          hyhttable_nsgxzzssb_kpi: "warn,down",
          dzxssr: 23,
          hyhttable_dzxssr_kpi: "up",
          dztb: 566,
          dzzgdpb: 67,
          children: [
            {
              hymc: 12,
              qyslhs: "服装",
              hyhttable_qyslhs_kpi: "warn,down,up",
              qysltb: "合计",
              qyslzzhsb: 7000,
              hyhttable_qyslzzhsb_kpi: "font#1,up,warn,down",
              nsgxnse: 7,
              nsgxtb: "12",
              nsgxzzssb: "12",
              dzxssr: "12",
              dztb: "12",
              dzzgdpb: "12",
              children: [
                {
                  hymc: "管理",
                  qyslhs: "管理",
                  qysltb: "管理",
                  qyslzzhsb: 4000,
                  nsgxnse: 123,
                  nsgxtb: "12",
                  nsgxzzssb: "12",
                  dzxssr: "12",
                  dztb: "12",
                  dzzgdpb: "12",
                  children: []
                }
              ]
            },
            {
              hymc: "12",
              qyslhs: "12",
              qysltb: "销售",
              qyslzzhsb: 3000,
              nsgxnse: 4,
              nsgxtb: "12",
              nsgxzzssb: "12",
              dzxssr: "12",
              dztb: "12",
              dzzgdpb: "12",
              children: []
            }
          ]
        },
        {
          hymc: "批发和零售业",
          qyslhs: 300,
          hyhttable_qyslhs_kpi: "font#1,up,down,warn",
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: []
        },
        {
          hymc: "制造业",
          qyslhs: 500,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: [
            {
              hymc: "家具制造业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: [
                {
                  hymc: "测试加工业",
                  qyslhs: 1.26,
                  qysltb: 1.31,
                  qyslzzhsb: 1.26,
                  nsgxnse: 2.56,
                  nsgxtb: 4.23,
                  nsgxzzssb: 1.23,
                  dzxssr: 1.56,
                  dztb: 2.36,
                  dzzgdpb: 3.3,
                  children: []
                }
              ]
            },
            {
              hymc: "有色金属冶炼和压延加工业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: []
            }
          ]
        },
        {
          hymc: "批发和零售业",
          qyslhs: 900,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: []
        },
        {
          hymc: "制造业",
          qyslhs: 300,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: [
            {
              hymc: "家具制造业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: [
                {
                  hymc: "测试加工业",
                  qyslhs: 1.26,
                  qysltb: 1.31,
                  qyslzzhsb: 1.26,
                  nsgxnse: 2.56,
                  nsgxtb: 4.23,
                  nsgxzzssb: 1.23,
                  dzxssr: 1.56,
                  dztb: 2.36,
                  dzzgdpb: 3.3,
                  children: []
                }
              ]
            },
            {
              hymc: "有色金属冶炼和压延加工业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: []
            }
          ]
        },
        {
          hymc: "制造业",
          qyslhs: 100,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: [
            {
              hymc: "家具制造业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: [
                {
                  hymc: "测试加工业",
                  qyslhs: 1.26,
                  qysltb: 1.31,
                  qyslzzhsb: 1.26,
                  nsgxnse: 2.56,
                  nsgxtb: 4.23,
                  nsgxzzssb: 1.23,
                  dzxssr: 1.56,
                  dztb: 2.36,
                  dzzgdpb: 3.3,
                  children: []
                }
              ]
            },
            {
              hymc: "有色金属冶炼和压延加工业",
              qyslhs: 200,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: []
            }
          ]
        },
        {
          hymc: "批发和零售业",
          qyslhs: 5555,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: []
        },
        {
          hymc: "制造业",
          qyslhs: 1.26,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: [
            {
              hymc: "家具制造业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: [
                {
                  hymc: "测试加工业",
                  qyslhs: 1.26,
                  qysltb: 1.31,
                  qyslzzhsb: 1.26,
                  nsgxnse: 2.56,
                  nsgxtb: 4.23,
                  nsgxzzssb: 1.23,
                  dzxssr: 1.56,
                  dztb: 2.36,
                  dzzgdpb: 3.3,
                  children: []
                }
              ]
            },
            {
              hymc: "有色金属冶炼和压延加工业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: []
            }
          ]
        },
        {
          hymc: "批发和零售业",
          qyslhs: 1.26,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: []
        },
        {
          hymc: "制造业",
          qyslhs: 1.26,
          qysltb: 1.31,
          qyslzzhsb: 1.26,
          nsgxnse: 2.56,
          nsgxtb: 4.23,
          nsgxzzssb: 1.23,
          dzxssr: 1.56,
          dztb: 2.36,
          dzzgdpb: 3.3,
          children: [
            {
              hymc: "家具制造业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: [
                {
                  hymc: "测试加工业",
                  qyslhs: 1.26,
                  qysltb: 1.31,
                  qyslzzhsb: 1.26,
                  nsgxnse: 2.56,
                  nsgxtb: 4.23,
                  nsgxzzssb: 1.23,
                  dzxssr: 1.56,
                  dztb: 2.36,
                  dzzgdpb: 3.3,
                  children: []
                }
              ]
            },
            {
              hymc: "有色金属冶炼和压延加工业",
              qyslhs: 1.26,
              qysltb: 1.31,
              qyslzzhsb: 1.26,
              nsgxnse: 2.56,
              nsgxtb: 4.23,
              nsgxzzssb: 1.23,
              dzxssr: 1.56,
              dztb: 2.36,
              dzzgdpb: 3.3,
              children: []
            }
          ]
        }
      ],
      treeStructure: true,
      treeType: "normal",
      defaultExpandAll: false
    };
    var pageInfo = {
      columns: data_1.columns,
      pageNum: 1,
      pageSize: 2,
      size: 10,
      orderBy: null,
      startRow: 1,
      endRow: 10,
      total: 138,
      pages: 5,
      list: data_1,
      firstPage: 1,
      prePage: 0,
      nextPage: 2,
      lastPage: 8,
      isFirstPage: true,
      isLastPage: false,
      hasPreviousPage: false,
      hasNextPage: true,
      navigatePages: 8,
      navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8]
    };
    setTimeout(function() {
        // 声明一个组件1
        var treeHelper0 = new $.fn.getTableHelper2();
        // 维度
        // data_1.dimensionality = 1;
        // 表格类型：自定义宽度
        // data_1.temple = "diy";

        treeHelper0.callbackPageInfo = function() {
            treeHelper0.updateNode(data_1.dataSource);
        };
        treeHelper0.init("treeDemo0", data_1, pageInfo);

            
        // 声明组件2
        // var treeHelper1 = new $.fn.getTableHelper2();
        // data_2 = JSON.parse(JSON.stringify(data_1))
        // data_2.temple = "simple";
        // treeHelper0.callbackPageInfo = function() {
        //     treeHelper0.updateNode(data_2.dataSource);
        // };
        // treeHelper0.init("treeDemo1", data_2, pageInfo);

    }, 100);
  },
  methods: {}
};
</script>

