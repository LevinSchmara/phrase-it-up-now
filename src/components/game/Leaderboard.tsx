
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Award, Star } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { gameSession, currentPlayer, returnToLobby } = useGame();

  if (!gameSession || gameSession.players.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No player data available</p>
        <Button className="mt-4" onClick={returnToLobby}>
          Return to Lobby
        </Button>
      </div>
    );
  }

  // Sort players by score
  const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);
  
  // Find the top 3 players
  const topPlayers = sortedPlayers.slice(0, 3);

  return (
    <div className="p-4 animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>

      {/* Top Players Podium */}
      <div className="flex justify-center items-end gap-2 mb-6">
        {topPlayers.length > 1 && (
          <div className="w-24 text-center">
            <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
              <span className="text-xl font-bold">{topPlayers[1].score}</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-b-lg">
              <p className="text-xs truncate font-medium">{topPlayers[1].name}</p>
              <div className="flex justify-center mt-1">
                <Star className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-xs text-muted-foreground">2nd Place</p>
            </div>
          </div>
        )}
        
        {topPlayers.length > 0 && (
          <div className="w-24 text-center">
            <div className="h-20 bg-yellow-300 dark:bg-yellow-700 rounded-t-lg flex items-center justify-center">
              <span className="text-2xl font-bold">{topPlayers[0].score}</span>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-b-lg">
              <p className="text-xs truncate font-medium">{topPlayers[0].name}</p>
              <div className="flex justify-center mt-1">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground">1st Place</p>
            </div>
          </div>
        )}
        
        {topPlayers.length > 2 && (
          <div className="w-24 text-center">
            <div className="h-12 bg-amber-200 dark:bg-amber-800 rounded-t-lg flex items-center justify-center">
              <span className="text-lg font-bold">{topPlayers[2].score}</span>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-b-lg">
              <p className="text-xs truncate font-medium">{topPlayers[2].name}</p>
              <div className="flex justify-center mt-1">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">3rd Place</p>
            </div>
          </div>
        )}
      </div>

      {/* Complete Scoreboard */}
      <Card className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow 
                key={player.id}
                className={player.id === currentPlayer?.id ? "bg-muted/50" : ""}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {player.name}
                  {player.id === currentPlayer?.id && <span className="text-xs ml-1">(you)</span>}
                </TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={returnToLobby}>
          Return to Lobby
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
