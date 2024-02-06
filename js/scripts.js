function seleccionarDificultad(dificultad) {
    switch (dificultad) {
        case 'facil':
            window.location.href = '../pages/facil.html';
            break;
        case 'medio':
            window.location.href = '../pages/medio.html';
            break;
        case 'dificil':
            window.location.href = '../pages/dificil.html';
            break;
        default:
            console.error('Dificultad no reconocida:', dificultad);
            break;
    }
}
