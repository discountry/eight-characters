const tg = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const dz = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];
const dz0 = [
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
  "子",
];

const jq84 = [
  442208451146, 444755924716, 447326679845, 449936540593, 452591457618,
  455285317308, 458000946032, 460714673166, 463403390187, 466051355952,
  468654332864, 471220083199,
];

const y_d84 = 441734400726;

export default class EightCharacters {
  private y: number;
  private m: number;
  private d: number;
  private h: number;
  private sex: number;

  constructor(y: number, m: number, d: number, h: number, sex: number) {
    this.y = Number(y);
    this.m = m - 1;
    this.d = Number(d);
    this.h = Number(h);
    this.sex = Number(sex) // 0 - female 1 - male;
  }

  private yGan(): string {
    //年干
    const y = this.y;
    return tg[(y + 6) % 10];
  }

  private yZhi(): string {
    //年支
    const y = this.y;
    let nz;
    if (y - 1984 <= 0) {
      nz = dz0[11 + ((y - 1984) % 12)];
    } else {
      if (((y - 1984) % 12) - 1 == -1) {
        nz = dz0[11];
      } else {
        nz = dz0[((y - 1984) % 12) - 1];
      }
    }
    return nz;
  }

  private yZhu(): string {
    //年柱
    return this.yGan() + this.yZhi();
  }

  private mGan(): string {
    //月干
    const m = this.m;
    const ng = this.yGan();
    let yg = '';
    if (ng == "甲" || ng == "己") yg = tg[(1 + m) % 10];
    if (ng == "乙" || ng == "庚") yg = tg[(3 + m) % 10];
    if (ng == "丙" || ng == "辛") yg = tg[(5 + m) % 10];
    if (ng == "丁" || ng == "壬") yg = tg[(7 + m) % 10];
    if (ng == "戊" || ng == "癸") yg = tg[(9 + m) % 10];
    const y_t = this.getYT();
    if (y_t < (this.y - 1984) * 31556926009 + jq84[m]) {
      tg.indexOf(yg) - 1 == -1
        ? (yg = tg[9])
        : (yg = tg[tg.indexOf(yg) - 1]);
    }
    return yg;
  }

  private mZhi(): string {
    //月支
    const m = this.m;
    const y_t = this.getYT();
    let yz = dz0[m];
    if (y_t < (this.y - 1984) * 31556926009 + jq84[m]) {
      yz = dz0[dz.indexOf(yz) - 1];
    }
    return yz;
  }

  private mZhu(): string {
    //月柱
    return this.mGan() + this.mZhi();
  }

  private dGan(): string {
    //日干
    const y_t = this.getYT();
    const y_r = Math.floor((y_t - y_d84) / 86400000) % 60;
    let rg;
    y_r >= 0 ? (rg = tg[y_r % 10]) : (rg = tg[(4 + ((60 + y_r) % 10)) % 10]);
    return rg;
  }

  private dZhi(): string {
    //日支
    const y_t = this.getYT();
    const y_r = Math.floor((y_t - y_d84) / 86400000) % 60;
    let rz;
    y_r >= 0
      ? (rz = dz0[(5 + (y_r % 12)) % 12])
      : (rz = dz0[(5 + ((60 + y_r) % 12)) % 12]);
    return rz;
  }

  private dZhu(): string {
    //日柱
    return this.dGan() + this.dZhi();
  }

  private hGan(): string {
    //时干
    const rg = this.dGan();
    const sz = this.hZhi();
    let sg = '';
    if (rg == "甲" || rg == "己") sg = tg[(1 + dz0.indexOf(sz)) % 10];
    if (rg == "乙" || rg == "庚") sg = tg[(3 + dz0.indexOf(sz)) % 10];
    if (rg == "丙" || rg == "辛") sg = tg[(5 + dz0.indexOf(sz)) % 10];
    if (rg == "丁" || rg == "壬") sg = tg[(7 + dz0.indexOf(sz)) % 10];
    if (rg == "戊" || rg == "癸") sg = tg[(9 + dz0.indexOf(sz)) % 10];
    return sg;
  }

  private hZhi(): string {
    //时支
    const h = this.h;
    let sz = '';
    if (h >= 0) sz = dz0[11];
    if (h >= 1) sz = dz0[0];
    if (h >= 3) sz = dz0[1];
    if (h >= 5) sz = dz0[2];
    if (h >= 7) sz = dz0[3];
    if (h >= 9) sz = dz0[4];
    if (h >= 11) sz = dz0[5];
    if (h >= 13) sz = dz0[6];
    if (h >= 15) sz = dz0[7];
    if (h >= 17) sz = dz0[8];
    if (h >= 19) sz = dz0[9];
    if (h >= 21) sz = dz0[10];
    if (h >= 23) sz = dz0[11];
    return sz;
  }

  private hZhu(): string {
    //时柱
    return this.hGan() + this.hZhi();
  }

  private xunKong(): string {
    //旬空
    const xtg = tg.indexOf(this.dGan());
    const xdz = dz.indexOf(this.dZhi());
    let xunk = '';
    if (xtg - xdz == 0) xunk = dz[10] + dz[11];
    if (xtg - xdz == -10 || xtg - xdz == 2) xunk = dz[8] + dz[9];
    if (xtg - xdz == -8 || xtg - xdz == 4) xunk = dz[6] + dz[7];
    if (xtg - xdz == -6 || xtg - xdz == 6) xunk = dz[4] + dz[5];
    if (xtg - xdz == -4 || xtg - xdz == 8) xunk = dz[2] + dz[3];
    if (xtg - xdz == -2) xunk = dz[0] + dz[1];
    return xunk;
  }

  private getYT(): number {
    const y = this.y;
    const m = this.m;
    const d = this.d;
    const h = this.h;
    const y_d = new Date();
    y_d.setFullYear(y);
    y_d.setMonth(m);
    y_d.setDate(d);
    y_d.setHours(h);
    y_d.setMinutes(0);
    y_d.setSeconds(0);
    return y_d.getTime();
  }

  public bazi(): string[] {
    //八字
    const bazi = [];
    bazi.push(this.yZhu());
    bazi.push(this.mZhu());
    bazi.push(this.dZhu());
    bazi.push(this.hZhu());
    return bazi;
  }

  public daYun(): string[] {
    //大运
    const dyg = [];
    const dyz = [];
    const tg1 = tg.concat(tg);
    const dz1 = dz.concat(dz);
    const sex = this.sex;
    const ng = this.yGan();
    const yg = this.mGan();
    const yz = this.mZhi();
    const dyun = [];
    //大运天干
    if (
      (tg.indexOf(ng) % 2 == 0 && sex == 1) ||
      (tg.indexOf(ng) % 2 == 1 && sex == 0)
    ) {
      for (let n = tg1.indexOf(yg) + 1; n < 20; n++) {
        dyg.push(tg1[n]);
        dyg.splice(8, 22);
      }
    }
    if (
      (tg.indexOf(ng) % 2 == 1 && sex == 1) ||
      (tg.indexOf(ng) % 2 == 0 && sex == 0)
    ) {
      tg1.reverse();
      for (let n = tg1.indexOf(yg) + 1; n < 20; n++) {
        dyg.push(tg1[n]);
        dyg.splice(8, 22);
      }
    }
    //大运地支
    if (
      (tg.indexOf(ng) % 2 == 0 && sex == 1) ||
      (tg.indexOf(ng) % 2 == 1 && sex == 0)
    ) {
      for (let n = dz1.indexOf(yz) + 1; n < 24; n++) {
        dyz.push(dz1[n]);
        dyz.splice(8, 26);
      }
    }
    if (
      (tg.indexOf(ng) % 2 == 1 && sex == 1) ||
      (tg.indexOf(ng) % 2 == 0 && sex == 0)
    ) {
      dz1.reverse();
      for (let n = dz1.indexOf(yz) + 1; n < 24; n++) {
        dyz.push(dz1[n]);
        dyz.splice(8, 26);
      }
    }
    for (const i in dyg) {
      dyun.push(dyg[i] + dyz[i]);
    }
    return dyun;
  }

  public qiYun(): number {
    //起运
    const y = this.y;
    const m = this.m;
    const sex = this.sex;
    const y_t = this.getYT();
    let qiy;
    if (y_t < (y - 1984) * 31556926009 + jq84[m]) {
      const jnianm = ((y - 1984) * 31556926009 + jq84[m] - y_t) / 259200000;
      const jniann =
        (y_t - ((y - 1984) * 31556926009 + jq84[m - 1])) / 259200000;
      sex == 1 && y % 2 == 0
        ? (qiy = Math.round(jnianm))
        : (qiy = Math.round(jniann));
      sex == 0 && y % 2 == 1
        ? (qiy = Math.round(jnianm))
        : (qiy = Math.round(jniann));
    } else {
      const jnianm = ((y - 1984) * 31556926009 + jq84[m + 1] - y_t) / 259200000;
      const jniann = (y_t - ((y - 1984) * 31556926009 + jq84[m])) / 259200000;
      sex == 1 && y % 2 == 0
        ? (qiy = Math.round(jnianm))
        : (qiy = Math.round(jniann));
      sex == 0 && y % 2 == 1
        ? (qiy = Math.round(jnianm))
        : (qiy = Math.round(jniann));
    }
    return qiy;
  }

  public liuNian(): string[] {
    //流年
    const n = this.qiYun();
    const y = this.y;
    const lgz = [];
    let l = parseInt(String(y)) + parseInt(String(n));
    let g, z;
    for (let n = 0; n < 80; n++) {
      g = tg[(l + 6) % 10];
      if (l - 1984 <= 0) {
        z = dz0[11 + ((l - 1984) % 12)];
      } else {
        if ((l - 1984) % 12 - 1 == -1) {
          z = dz0[11];
        } else {
          z = dz0[((l - 1984) % 12) - 1];
        }
      }
      lgz.push(g + z);
      l = l + 1;
    }
    return lgz;
  }

  public liuNianTable() {
    const y = this.y;
    const liuNian = this.liuNian();
    const liuNianTable = new Map();
    for (let i = 0; i < liuNian.length; i++) {
      liuNianTable.set(y + i, liuNian[i]);
    }
    return liuNianTable;
  }

  public shiShen(g: string): string | undefined {
    //十神
    const shi = tg.indexOf(this.dGan());
    const cn = tg.indexOf(g);
    let sn;
    if (shi % 2 == 0) {
      if (cn - shi == -5 || cn - shi == 5) sn = "财";
      if (cn - shi == -4 || cn - shi == 6) sn = "杀";
      if (cn - shi == -3 || cn - shi == 7) sn = "官";
      if (cn - shi == -2 || cn - shi == 8) sn = "枭";
      if (cn - shi == -1 || cn - shi == 9) sn = "印";
      if (cn - shi == 0) sn = "比";
      if (cn - shi == 1 || cn - shi == -9) sn = "劫";
      if (cn - shi == 2 || cn - shi == -8) sn = "食";
      if (cn - shi == 3 || cn - shi == -7) sn = "伤";
      if (cn - shi == 4 || cn - shi == -6) sn = "才";
    }
    if (shi % 2 == 1) {
      if (cn - shi == -5 || cn - shi == 5) sn = "官";
      if (cn - shi == -4 || cn - shi == 6) sn = "杀";
      if (cn - shi == -3 || cn - shi == 7) sn = "印";
      if (cn - shi == -2 || cn - shi == 8) sn = "枭";
      if (cn - shi == -1 || cn - shi == 9) sn = "劫";
      if (cn - shi == 0) sn = "比";
      if (cn - shi == 1 || cn - shi == -9) sn = "伤";
      if (cn - shi == 2 || cn - shi == -8) sn = "食";
      if (cn - shi == 3 || cn - shi == -7) sn = "财";
      if (cn - shi == 4 || cn - shi == -6) sn = "才";
    }
    return sn;
  }

  public shiShenTable() {
    const yGan = this.yGan();
    const mGan = this.mGan();
    const hGan = this.hGan();

    const yShen = this.shiShen(yGan);
    const mShen = this.shiShen(mGan);
    const dSelf = this.xingBie();
    const hShen = this.shiShen(hGan);
    
    const shiShenTable = new Map();

    shiShenTable.set("年", yShen);
    shiShenTable.set("月", mShen);
    shiShenTable.set("日", dSelf);
    shiShenTable.set("时", hShen);

    return shiShenTable;
  }

  public xingBie(): string {
    //性别
    const sex = this.sex;
    let qk;
    sex == 0 ? (qk = "坤造") : (qk = "乾造");
    return qk;
  }

  public naYin(zhu: string): string {
    //纳音
    const nayi = {
      甲子: ["海中金"],
      乙丑: ["海中金"],
      丙寅: ["炉中火"],
      丁卯: ["炉中火"],
      戊辰: ["大林木"],
      己巳: ["大林木"],
      庚午: ["路旁土"],
      辛未: ["路旁土"],
      壬申: ["剑锋金"],
      癸酉: ["剑锋金"],
      甲戌: ["山头火"],
      乙亥: ["山头火"],
      丙子: ["涧下水"],
      丁丑: ["涧下水"],
      戊寅: ["城墙土"],
      己卯: ["城墙土"],
      庚辰: ["白腊金"],
      辛巳: ["白腊金"],
      壬午: ["杨柳木"],
      癸未: ["杨柳木"],
      甲申: ["泉中水"],
      乙酉: ["泉中水"],
      丙戌: ["屋上土"],
      丁亥: ["屋上土"],
      戊子: ["霹雳火"],
      己丑: ["霹雳火"],
      庚寅: ["松柏木"],
      辛卯: ["松柏木"],
      壬辰: ["长流水"],
      癸巳: ["长流水"],
      甲午: ["沙中金"],
      乙未: ["沙中金"],
      丙申: ["山下火"],
      丁酉: ["山下火"],
      戊戌: ["平地木"],
      己亥: ["平地木"],
      庚子: ["壁上土"],
      辛丑: ["壁上土"],
      壬寅: ["金箔金"],
      癸卯: ["金箔金"],
      甲辰: ["覆灯火"],
      乙巳: ["覆灯火"],
      丙午: ["天河水"],
      丁未: ["天河水"],
      戊申: ["大驿土"],
      己酉: ["大驿土"],
      庚戌: ["钗钏金"],
      辛亥: ["钗钏金"],
      壬子: ["桑柘木"],
      癸丑: ["桑柘木"],
      甲寅: ["大溪水"],
      乙卯: ["大溪水"],
      丙辰: ["沙中土"],
      丁巳: ["沙中土"],
      戊午: ["天上火"],
      己未: ["天上火"],
      庚申: ["石榴木"],
      辛酉: ["石榴木"],
      壬戌: ["大海水"],
      癸亥: ["大海水"],
    };
    let na: any[] = [];
    na = na.concat(nayi[zhu as keyof typeof nayi]);
    return na[0];
  }

  public naYinTable() {
    const yZhu = this.yZhu();
    const mZhu = this.mZhu();
    const dZhu = this.dZhu();
    const hZhu = this.hZhu();

    const yNaYin = this.naYin(yZhu);
    const mNaYin = this.naYin(mZhu);
    const dNaYin = this.naYin(dZhu);
    const hNaYin = this.naYin(hZhu);

    const naYinTable = new Map();

    naYinTable.set("年", yNaYin);
    naYinTable.set("月", mNaYin);
    naYinTable.set("日", dNaYin);
    naYinTable.set("时", hNaYin);

    return naYinTable;
  }

  public shuaiWang(g: string, z: string): string {
    //旺衰
    const zsss = {
      甲: [
        "沐浴",
        "冠带",
        "临官",
        "帝旺",
        "衰",
        "病",
        "死",
        "墓",
        "绝",
        "胎",
        "养",
        "长生",
      ],
      乙: [
        "病",
        "衰",
        "帝旺",
        "临官",
        "冠带",
        "沐浴",
        "长生",
        "养",
        "胎",
        "绝",
        "墓",
        "死",
      ],
      丙: [
        "胎",
        "养",
        "长生",
        "沐浴",
        "冠带",
        "临官",
        "帝旺",
        "衰",
        "病",
        "死",
        "墓",
        "绝",
      ],
      丁: [
        "绝",
        "墓",
        "死",
        "病",
        "衰",
        "帝旺",
        "临官",
        "冠带",
        "沐浴",
        "长生",
        "养",
        "胎",
      ],
      戊: [
        "胎",
        "养",
        "长生",
        "沐浴",
        "冠带",
        "临官",
        "帝旺",
        "衰",
        "病",
        "死",
        "墓",
        "绝",
      ],
      己: [
        "绝",
        "墓",
        "死",
        "病",
        "衰",
        "帝旺",
        "临官",
        "冠带",
        "沐浴",
        "长生",
        "养",
        "胎",
      ],
      庚: [
        "死",
        "墓",
        "绝",
        "胎",
        "养",
        "长生",
        "沐浴",
        "冠带",
        "临官",
        "帝旺",
        "衰",
        "病",
      ],
      辛: [
        "长生",
        "养",
        "胎",
        "绝",
        "墓",
        "死",
        "病",
        "衰",
        "帝旺",
        "临官",
        "冠带",
        "沐浴",
      ],
      壬: [
        "帝旺",
        "衰",
        "病",
        "死",
        "墓",
        "绝",
        "胎",
        "养",
        "长生",
        "沐浴",
        "冠带",
        "临官",
      ],
      癸: [
        "临官",
        "冠带",
        "沐浴",
        "长生",
        "养",
        "胎",
        "绝",
        "墓",
        "死",
        "病",
        "衰",
        "帝旺",
      ],
    };
    const zz = dz.indexOf(z);
    const sr = zsss[g as keyof typeof zsss][zz];
    return sr;
  }

  public wuXing(gan: string): string {
    //五行
    let wux = "";
    if (gan == "甲" || gan == "乙") wux = "木";
    if (gan == "丙" || gan == "丁") wux = "火";
    if (gan == "戊" || gan == "己") wux = "土";
    if (gan == "庚" || gan == "辛") wux = "金";
    if (gan == "壬" || gan == "癸") wux = "水";
    return wux;
  }

  public cangGan(zhi: string): (string | number)[] {
    const cangdun: { [key: string]: (string | number)[] } = {
      子: ["癸", 48],
      丑: ["己", 16, "癸", 8, "辛", 4],
      寅: ["甲", 32, "丙", 16, "戊", 8],
      卯: ["乙", 48],
      辰: ["戊", 16, "乙", 8, "壬", 8],
      巳: ["丙", 32, "庚", 8, "戊", 8],
      午: ["丁", 48, "己", 24],
      未: ["己", 32, "丁", 8, "乙", 8],
      申: ["庚", 32, "壬", 16, "戊", 8],
      酉: ["辛", 48],
      戌: ["戊", 32, "丁", 8, "辛", 8],
      亥: ["壬", 32, "甲", 16],
    };
    const z = cangdun[zhi];
    const zh = [];
    for (let i = 0; i < z.length; i++) {
      if (i % 2 == 0) zh.push(z[i] as string);
      if (i % 2 == 0) zh.push(z[i]);
    }
    return zh;
  }
}
