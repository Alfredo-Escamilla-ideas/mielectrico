<?php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
setCors();

$db = getDB();
$db->exec('CREATE TABLE IF NOT EXISTS custom_vehicles (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  make        VARCHAR(100) NOT NULL,
  model       VARCHAR(100) NOT NULL,
  version     VARCHAR(200) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_vehicle (make, model, version)
)');

// ── GET — público ────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = $db->query(
        'SELECT id, make, model, version FROM custom_vehicles ORDER BY make, model, version'
    )->fetchAll();
    json($rows);
}

// ── Todas las demás acciones requieren contraseña admin ──────────────────────
$b = body();
if (($b['admin_password'] ?? '') !== ADMIN_PASSWORD) {
    err('Contraseña de administrador incorrecta', 403);
}

// ── POST — añadir entrada ────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $make    = trim($b['make']    ?? '');
    $model   = trim($b['model']   ?? '');
    $version = trim($b['version'] ?? '');
    if (!$make || !$model || !$version) err('Marca, modelo y versión son obligatorios');

    try {
        $db->prepare('INSERT INTO custom_vehicles (make, model, version) VALUES (?, ?, ?)')
           ->execute([$make, $model, $version]);
        json([
            'id' => (int)$db->lastInsertId(),
            'make' => $make, 'model' => $model, 'version' => $version,
        ], 201);
    } catch (\PDOException) {
        err('Esa combinación marca/modelo/versión ya existe');
    }
}

// ── PUT — renombrar / editar ─────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $action = $b['action'] ?? 'update';

    if ($action === 'rename_make') {
        $old = trim($b['old_make'] ?? '');
        $new = trim($b['new_make'] ?? '');
        if (!$old || !$new) err('Faltan parámetros');
        $db->prepare('UPDATE custom_vehicles SET make = ? WHERE make = ?')->execute([$new, $old]);
        json(['ok' => true]);
    }

    if ($action === 'rename_model') {
        $make  = trim($b['make']      ?? '');
        $old   = trim($b['old_model'] ?? '');
        $new   = trim($b['new_model'] ?? '');
        if (!$make || !$old || !$new) err('Faltan parámetros');
        $db->prepare('UPDATE custom_vehicles SET model = ? WHERE make = ? AND model = ?')
           ->execute([$new, $make, $old]);
        json(['ok' => true]);
    }

    if ($action === 'update') {
        $id      = (int)($b['id']      ?? 0);
        $make    = trim($b['make']    ?? '');
        $model   = trim($b['model']   ?? '');
        $version = trim($b['version'] ?? '');
        if (!$id || !$make || !$model || !$version) err('Faltan parámetros');
        try {
            $db->prepare('UPDATE custom_vehicles SET make=?, model=?, version=? WHERE id=?')
               ->execute([$make, $model, $version, $id]);
            json(['ok' => true]);
        } catch (\PDOException) {
            err('Esa combinación ya existe');
        }
    }

    err('Acción desconocida');
}

// ── DELETE — borrar entrada / modelo / marca ─────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $action = $b['action'] ?? 'delete';

    if ($action === 'delete_make') {
        $make = trim($b['make'] ?? '');
        if (!$make) err('Marca requerida');
        $db->prepare('DELETE FROM custom_vehicles WHERE make = ?')->execute([$make]);
        json(['ok' => true]);
    }

    if ($action === 'delete_model') {
        $make  = trim($b['make']  ?? '');
        $model = trim($b['model'] ?? '');
        if (!$make || !$model) err('Marca y modelo requeridos');
        $db->prepare('DELETE FROM custom_vehicles WHERE make = ? AND model = ?')->execute([$make, $model]);
        json(['ok' => true]);
    }

    // Borrar versión individual por id
    $id = (int)($b['id'] ?? 0);
    if (!$id) err('ID inválido');
    $db->prepare('DELETE FROM custom_vehicles WHERE id = ?')->execute([$id]);
    json(['ok' => true]);
}

err('Método no permitido', 405);
