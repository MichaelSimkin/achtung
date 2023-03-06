export const getCircleCircumferenceIndexes = (radius: number, startAngle: number, endAngle: number) => {
    const indexes: number[] = [];
    const angleDelta = Math.PI / (2 * radius);
    const startFromAngle = startAngle - (startAngle % angleDelta) + angleDelta / 2;
    for (let i = startFromAngle; i < endAngle; i += angleDelta) {
        indexes.push(Math.floor(radius * (Math.cos(i) + 1)) + Math.floor(radius * (Math.sin(i) + 1)) * 2 * radius);
    }
    return indexes;
};
