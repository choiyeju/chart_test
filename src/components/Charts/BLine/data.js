// recoil로 옮겨야 하는 데이터
export const initOptions = {
    text: {
        x: 'Visit',
        y: 'Value',
    },
    min: 0,
    max: 20,
    gap: 2,

    elements: [
        {
            kind: 'main',

            borderColor: 'rgb(111, 107, 244)',
            borderWidth: 2,

            pointBackgroundColor: 'rgb(111, 107, 244)',
            pointRadius: 5,

            pointBorderColor: 'rgb(111, 107, 244)',
            pointHoverBorderColor: 'rgb(255, 255, 255)',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 4,

            backgroundColor: 'rgb(111, 107, 244)',
        },
        {
            kind: 'side',

            borderColor: 'rgb(246, 141, 93)',
            borderWidth: 2,

            pointBackgroundColor: 'rgb(246, 141, 93)',
            pointRadius: 4,

            pointBorderColor: 'rgb(246, 141, 93)',
            pointBorderWidth: 2,

            backgroundColor: 'rgb(246, 141, 93)',
        },
    ],
}