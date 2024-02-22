// recoil로 옮겨야 하는 데이터
export const initValue = {
    text: {
        x: 'Visit',
        y: 'Value',
    },
    min: 0,
    max: 20,
    gap: 2,

    elements: [
        {
            borderColor: 'rgb(111, 107, 244)',
            borderWidth: 2,

            pointBackgroundColor: 'rgb(111, 107, 244)',
            pointRadius: 5,

            pointBorderColor: 'rgb(111, 107, 244)',
            pointHoverBorderColor: 'white',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 4,

            backgroundColor: 'rgb(111, 107, 244)',
        },
        {
            borderColor: 'rgb(246, 141, 93)',
            borderWidth: 2,

            pointBackgroundColor: 'rgb(246, 141, 93)',
            pointRadius: 4,

            pointBorderColor: 'rgb(0, 0, 0)',
            pointBorderWidth: 2,

            backgroundColor: 'rgb(246, 141, 93)',
        },
    ],
}