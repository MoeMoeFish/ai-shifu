/** inject image to mc-editor */
import React, {useState} from 'react'
import { ImageUploader } from '@/components/file-uploader'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
type ImageInjectProps = {
  onSelect: (url: string) => void
}

const ImageInject: React.FC<ImageInjectProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState<string>('')
  const handleSelect = () => {
    onSelect?.("![image](" + imageUrl + ")")
  }
  return (
    <div>
      <ImageUploader onChange={(url) =>setImageUrl(url)} />
      <div className='flex py-4 justify-end'>
        <Button
          className='h-8'
          onClick={handleSelect}
          disabled={!imageUrl}
        >
          {t('common.use-image')}
        </Button>
      </div>
    </div>
  )
}

export default ImageInject
