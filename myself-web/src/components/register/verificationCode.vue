<template>
  <div class="box">
    <canvas id="code" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>

<script>
import { randomNum } from '@/utils/index'

export default {
  name: 'VerifcationCode',
  props: {
    code: {
      type: String,
      default: '1314'
    }
  },
  data () {
    return {
      contentWidth: 112,
      contentHeight: 38
    }
  },
  watch: {
    code () {
      this.drawImg()
    }
  },
  mounted () {
    this.drawImg()
  },
  methods: {
    // 生成随机颜色
    randomColor (min, max) {
      const r = randomNum(min, max)
      const g = randomNum(min, max)
      const b = randomNum(min, max)
      return `rgb(${r}, ${g}, ${b})`
    },
    // 生成验证码
    drawImg () {
      const canvas = document.getElementById('code')
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom' // 设置或返回在绘制文本时的当前文本基线。
      // 绘制背景
      ctx.fillStyle = this.randomColor(255, 255)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.code.length; i++) {
        this.drawText(ctx, this.code[i], i)
      }
      // 绘制干扰线
      this.drawLine(ctx)
      // 绘制干扰点
      this.drawDot(ctx)
    },
    // 绘制文字
    drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(0, 160)
      ctx.font = randomNum(25, 30) + 'px SimHei'
      const x = (i + 1) * (this.contentWidth / (this.code.length + 1))
      const y = randomNum(30, this.contentHeight - 5)
      const deg = randomNum(-45, 45)
      // 修改坐标原点与旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点与旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    // 绘制干扰线
    drawLine (ctx) {
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.randomColor(100, 255)
        ctx.beginPath()
        ctx.moveTo(randomNum(0, this.contentWidth), randomNum(0, this.contentHeight))
        ctx.lineTo(randomNum(0, this.contentWidth), randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },
    // 绘制干扰点
    drawDot (ctx) {
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(randomNum(0, this.contentWidth), randomNum(0, this.contentHeight), 1, 0, Math.PI * 2)
        ctx.lineTo(randomNum(0, this.contentWidth), randomNum(0, this.contentHeight))
        ctx.fill()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 38px;
}
</style>
