import React from 'react'

interface AvatarProps {
  name: string
  imageUrl?: string
  size?: number
}

export function Avatar({ name, imageUrl, size = 36 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    color: '#333',
    fontWeight: 'bold',
    fontSize: `${size / 2.5}px`,
  }

  return (
    <div style={style}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  )
}

