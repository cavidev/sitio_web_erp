---------------------------------------------------------- TABLAS ----------------------------------------------------------

CREATE TABLE Cliente
(
	cedula		VARCHAR(10) PRIMARY KEY,
	nombre		VARCHAR(50)
);

GO

CREATE TABLE Producto
(
	id		INT		IDENTITY(1,1) PRIMARY KEY,
	nombre			VARCHAR(50),
	precio			INT,
	impuesto		INT
);

GO

CREATE TABLE Inventario
(
	id			INT		IDENTITY(1,1) PRIMARY KEY,
	producto	INT		REFERENCES	Producto(id) UNIQUE,
	cantidad	INT,
	cantidadMin		INT,
	cantidadMax		INT,
	gravadoOExcepto		BIT
);

GO

CREATE TABLE Factura
(
	id		INT		IDENTITY(1,1) PRIMARY KEY,
	cliente			VARCHAR(10) REFERENCES Cliente(cedula),
	fecha			VARCHAR(10),
	montoTotal		INT,
	subtotal		INT,
	impuestos		INT,
	habilitada		BIT
);

ALTER TABLE Factura ALTER COLUMN fecha VARCHAR(10)

INSERT INTO Factura (cliente, fecha, montoTotal, subtotal, impuestos, habilitada) VALUES ('101230456','12-12-2012',40000, 35000, 5000, 1)

GO

CREATE TABLE FacturaProducto
(
	id				INT		IDENTITY(1,1) PRIMARY KEY,
	idFactura		INT REFERENCES Factura(id),
	idProducto		INT	REFERENCES Producto(id),
	cantidad		INT
);

GO

INSERT INTO FacturaProducto (idFactura, idProducto, cantidad) VALUES (2,1,5)
INSERT INTO FacturaProducto (idFactura, idProducto, cantidad) VALUES (2,2,5)

---------------------------------------------------------- PROCEDIMIENTOS CLIENTES ----------------------------------------------------------


CREATE PROCEDURE ObtenerClientes
	@success		BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			SELECT * FROM Cliente
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
	GO

	exec ObtenerClientes 1

	GO

CREATE PROCEDURE CrearCliente
	@cedula				VARCHAR(10),
	@nombre				VARCHAR(50),
	@success			BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			INSERT INTO Cliente (cedula, nombre)
			VALUES (@cedula, @nombre);
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec CrearCliente '206310843','Efren Jimenez',1

GO

--DROP PROCEDURE ModificarCliente
CREATE PROCEDURE ModificarCliente
	@cedula				VARCHAR(10),
	@nombre				VARCHAR(50),
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			UPDATE Cliente SET nombre = @nombre WHERE cedula = @cedula;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec ModificarCliente '402320763','Esteban Blanco Espinoza',1


GO

--DROP PROCEDURE EliminarCliente
CREATE PROCEDURE EliminarCliente
	@cedula				VARCHAR(10),
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			DELETE FROM Cliente WHERE cedula = @cedula;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec EliminarCliente '402320763', 1

GO
---------------------------------------------------------- PROCEDIMIENTOS PRODUCTOS ----------------------------------------------------------

CREATE PROCEDURE ObtenerProductos
	@success		BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			SELECT * FROM Producto
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
	GO

	exec ObtenerProductos 1

	GO

CREATE PROCEDURE CrearProducto
	@nombre				VARCHAR(50),
	@precio				INT,
	@impuesto			INT,
	@success			BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			INSERT INTO Producto(nombre, precio, impuesto)
			VALUES (@nombre, @precio, @impuesto);
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec CrearProducto 'Camote',300,50 ,1

GO

--DROP PROCEDURE ModificarCliente
CREATE PROCEDURE ModificarProducto
	@id					INT,
	@nombre				VARCHAR(50),
	@precio				INT,
	@impuesto			INT,
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			UPDATE Producto SET nombre = @nombre, precio = @precio, impuesto = @impuesto WHERE id = @id;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec ModificarProducto 3,'Tomate',300,50,1


GO

--DROP PROCEDURE EliminarCliente
CREATE PROCEDURE EliminarProducto
	@id					INT,
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			DELETE FROM Producto WHERE id = @id;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec EliminarProducto 3,1

GO
---------------------------------------------------------- PROCEDIMIENTOS INVENTARIOS ----------------------------------------------------------

CREATE PROCEDURE ObtenerInventarios
	@success		BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			SELECT i.id, i.producto, p.nombre, p.impuesto, p.precio, i.cantidad, i.cantidadMin, i.cantidadMax, i.gravadoOExcepto FROM Inventario i INNER JOIN Producto p ON (i.producto = p.id)
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
	GO

	exec ObtenerInventarios 1

	GO

CREATE PROCEDURE CrearInventario
	@producto			INT, 
	@cantidad			INT, 
	@cantidadMin		INT, 
	@cantidadMax		INT, 
	@gravadoOExcepto	BIT,
	@success			BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			INSERT INTO Inventario(producto, cantidad, cantidadMin, cantidadMax, gravadoOExcepto)
			VALUES (@producto, @cantidad, @cantidadMin, @cantidadMax, @gravadoOExcepto);
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec CrearInventario 2, 20, 5, 40, 1, 1

GO

--DROP PROCEDURE ModificarCliente
CREATE PROCEDURE ModificarInventario
	@id					INT,
	@producto			INT, 
	@cantidad			INT, 
	@cantidadMin		INT, 
	@cantidadMax		INT, 
	@gravadoOExcepto	BIT,
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			UPDATE Inventario SET producto = @producto, cantidad = @cantidad, 
			cantidadMin = @cantidadMin, cantidadMax = @cantidadMax, gravadoOExcepto = @gravadoOExcepto
			WHERE id = @id;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec ModificarInventario 5, 2, 30, 5, 50, 0, 1


GO

--DROP PROCEDURE EliminarCliente
CREATE PROCEDURE EliminarInventario
	@id					INT,
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			DELETE FROM Inventario WHERE id = @id;
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

exec EliminarInventario 5,1

GO
---------------------------------------------------------- PROCEDIMIENTOS FACTURAS ----------------------------------------------------------

CREATE PROCEDURE ObtenerFacturas
	@success		BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			SELECT f.id, f.cliente, c.nombre, f.fecha, f.montoTotal, f.subtotal, f.impuestos FROM Factura f INNER JOIN Cliente c ON (f.cliente = c.cedula)
			WHERE habilitada = 1
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
	GO

	exec ObtenerFacturas 1

	GO


CREATE PROCEDURE CrearFactura
	@cliente			VARCHAR(10), 
	@fecha				VARCHAR(10), 
	@montoTotal			INT, 
	@subtotal			INT, 
	@impuestos			INT,
	@success			BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			INSERT INTO Factura(cliente, fecha, montoTotal, subtotal, impuestos, habilitada)
			VALUES (@cliente, @fecha, @montoTotal, @subtotal, @impuestos, 1);
			SELECT IDENT_CURRENT('Factura') AS IdFactura
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO

CREATE PROCEDURE AsociarProductoAFactura
	@idFactura			INT, 
	@idProducto			INT, 
	@cantidad			INT,
	@success			BIT OUTPUT
	AS
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			INSERT INTO FacturaProducto(idFactura, idProducto, cantidad)
			VALUES (@idFactura, @idProducto, @cantidad);
			UPDATE Inventario SET cantidad = cantidad - @cantidad
			SET @success = 1
			SELECT @success
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END

GO

--DROP PROCEDURE EliminarCliente
CREATE PROCEDURE DeshabilitarFactura
	@id					INT,
	@success			BIT OUTPUT
	AS
	DECLARE @rowcount INT
	BEGIN
		SET NOCOUNT ON;
		BEGIN TRY
			UPDATE Factura SET habilitada = 0 WHERE id = @id
			SET @rowcount = @@ROWCOUNT 
			IF @rowcount = 0
				BEGIN
					SET @success = 0
					SELECT @success
				END
			ELSE
				BEGIN
					SET @success = 1
					SELECT @success
				END
		END TRY
		BEGIN CATCH
			SET @success = 0
			SELECT @success
			END CATCH
	SET NOCOUNT OFF;
	END
GO
