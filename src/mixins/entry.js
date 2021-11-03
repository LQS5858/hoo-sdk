export default {
    provide: {
        closeCb: () => { },
        opts: {
            dotBgColor: '',
            dotBorderColor: '',
            curStep: 2,
            stepList: [
                {
                    step: 1,
                    classId: '',
                    title: '选择交易对',
                    content: '选择或搜索您感兴趣的数字货币交易',
                    nextText: '下一步',
                    prevText: '跳过'
                },
                {
                    step: 2,
                    classId: '',
                    title: '选择交易对2',
                    content: '选择或搜索您感兴趣的数字货币交易2',
                    nextText: '下一步',
                    prevText: '跳过'
                }
            ]
        }
    }
}