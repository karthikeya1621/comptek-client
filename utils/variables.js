const variables = {
    headerHeight: 100,
    carouselHeight: 530
}

const referencevariables = {
    headerHeight: 125,
    carouselHeight: 630
}

export const resize = (size, prop) => {
    if(variables[prop + '']) {
        return size * variables[prop + ''] / referencevariables[prop + ''];
    } else {
        return size;
    }
}

export default variables;