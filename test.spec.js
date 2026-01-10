import { test, expect } from '@playwright/test';

test('Complete game flow - Europe Capitals quiz', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:5500/index.html');
  
  // Check that start screen is visible
  const startScreen = page.locator('#startScreen');
  await expect(startScreen).toBeVisible();
  
  const title = page.locator('h1');
  await expect(title).toContainText('Geo Quiz');
  
  // Click Start button
  const startButton = page.locator('#startButton');
  await startButton.click();
  await page.waitForTimeout(1000);
  
  // Verify game selection screen appears
  const gameSelectionScreen = page.locator('#gameSelectionScreen');
  await expect(gameSelectionScreen).toBeVisible();
  
  const selectionTitle = page.locator('#gameSelectionScreen h2');
  await expect(selectionTitle).toContainText('Select Quiz Pack');
  
  // Click on Europe - Capitals
  const europeCapsButton = page.locator('[data-pack="capitals-europe"]');
  await europeCapsButton.click();
  await page.waitForTimeout(1500);
  
  // Verify game screen appears
  const gameScreen = page.locator('#gameScreen');
  await expect(gameScreen).toBeVisible();
  
  // Verify initial score is 0
  const scoreSpan = page.locator('#scoreSpan');
  await expect(scoreSpan).toContainText('0');
  
  // Verify first question is loaded
  const questionText = page.locator('#questionText');
  const firstQuestion = await questionText.textContent();
  expect(firstQuestion).toBeTruthy();
  expect(firstQuestion.length).toBeGreaterThan(0);
  
  // Verify that Next button is hidden initially
  const nextButton = page.locator('#nextButton');
  await expect(nextButton).toBeHidden();
  
  // Get all answer items
  const answerItems = page.locator('.item');
  const answerCount = await answerItems.count();
  expect(answerCount).toBe(4);
  
  // Verify all answers are visible and contain text
  for (let i = 0; i < answerCount; i++) {
    const answer = answerItems.nth(i);
    await expect(answer).toBeVisible();
    const answerText = await answer.textContent();
    expect(answerText.length).toBeGreaterThan(0);
  }
  
  // Click on first answer
  const firstAnswer = answerItems.first();
  await firstAnswer.click();
  await page.waitForTimeout(1200);
  
  // Verify Next button appears after answer selection
  await expect(nextButton).toBeVisible();
  
  // Get the current score after first answer
  const scoreAfterFirstAnswer = await scoreSpan.textContent();
  expect(scoreAfterFirstAnswer).toBeTruthy();
  
  // Click Next button
  await page.waitForTimeout(1000);
  await nextButton.click();
  
  // Verify Next button is hidden after clicking it
  await expect(nextButton).toBeHidden();
  
  // Verify question changed
  const secondQuestion = await questionText.textContent();
  expect(secondQuestion).not.toBe(firstQuestion);
  
  // Answer remaining questions - continue until game over
  let currentQuestionIndex = 1;
  const maxIterations = 50; // Safety limit to prevent infinite loop
  let iteration = 0;
  
  while (iteration < maxIterations) {
    iteration++;
    
    // Check if game over screen is visible
    const gameOverScreen = page.locator('#gameOverScreen');
    const isGameOver = await gameOverScreen.isVisible().catch(() => false);
    
    if (isGameOver) {
      break;
    }
    
    // Check game screen is still visible
    const isGameScreenVisible = await gameScreen.isVisible().catch(() => false);
    if (!isGameScreenVisible) {
      break;
    }
    
    // Click on an answer
    const answers = page.locator('#answerBlock .item');
    const answerToClick = answers.first();
    await answerToClick.click();
    await page.waitForTimeout(800);
    
    // Wait for next button to be visible
    await expect(nextButton).toBeVisible({ timeout: 5000 });
    
    // Check score updated (either increased or decreased)
    const newScore = await scoreSpan.textContent();
    expect(newScore).toBeTruthy();
    
    await page.waitForTimeout(1000);
    // Click next button
    await nextButton.click();
    
    currentQuestionIndex++;
  }
  
  // Verify game over screen appears
  const gameOverScreen = page.locator('#gameOverScreen');
  await expect(gameOverScreen).toBeVisible({ timeout: 10000 });
  
  // Verify game over content
  const gameOverTitle = page.locator('#gameOverScreen h2');
  await expect(gameOverTitle).toContainText('Game Over!');
  
  // Verify final score is displayed
  const finalScoreSpan = page.locator('#finalScoreSpan');
  const finalScore = await finalScoreSpan.textContent();
  expect(finalScore).toBeTruthy();
  
  // Verify Restart button exists and is visible
  const restartButton = page.locator('#restartButton');
  await expect(restartButton).toBeVisible();
  
  await page.waitForTimeout(1000);
  // Click Restart button
  await restartButton.click();
  
  // Verify we're back to start screen
  await expect(startScreen).toBeVisible();
  
  console.log(`✓ Game completed successfully!`);
  console.log(`✓ Final score: ${finalScore}`);
  console.log(`✓ Total questions answered: ${currentQuestionIndex}`);
});
