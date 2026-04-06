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

// ── POST / DELETE — requieren contraseña admin ───────────────────────────────
$b = body();
if (($b['admin_password'] ?? '') !== ADMIN_PASSWORD) {
    err('Contraseña de administrador incorrecta', 403);
}

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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)($b['id'] ?? 0);
    if (!$id) err('ID inválido');
    $db->prepare('DELETE FROM custom_vehicles WHERE id = ?')->execute([$id]);
    json(['ok' => true]);
}

err('Método no permitido', 405);
