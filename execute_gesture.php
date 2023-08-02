<?php
$pythonFilePath = 'gesture_reg/gesture-recog.py';
exec("python $pythonFilePath 2>&1", $output, $returnCode);
if ($returnCode !== 0) {
  $errorMessage = "Error executing Python file: " . implode("\n", $output);
  $response = [
    'output' => null,
    'error' => $errorMessage
  ];
} else {
  $response = [
    'output' => $output,
    'error' => null
  ];
}
header('Content-Type: application/json');
echo json_encode($response);
?>