// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{
	
	var rad = rotation * Math.PI / 180;
	var S = Array( scale, 0, 0, 0, scale, 0, 0, 0, 1 ); //homo
	var R = Array( Math.cos(rad), Math.sin(rad), 0, -Math.sin(rad), Math.cos(rad), 0 ,0, 0, 1);
	var T = Array(1, 0, 0, 0, 1, 0, positionX, positionY, 1);

	var M = productMatrix(T, productMatrix(R, S))
	return M
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	return productMatrix(trans2, trans1)
}

function productMatrix(A, B){
	let C = new Array(9).fill(0);

    for (let col = 0; col < 3; col++) { // Iteriamo sulle colonne di B
        for (let row = 0; row < 3; row++) { // Iteriamo sulle righe di A
            let sum = 0;
            for (let k = 0; k < 3; k++) { // Prodotto riga per colonna
                sum += A[k * 3 + row] * B[col * 3 + k]; // Indici adattati a column-major
            }
            C[col * 3 + row] = sum; // Scriviamo il risultato mantenendo column-major
        }
    }

    return C;
}